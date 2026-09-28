import JobApplications from "../models/jobApplications.js"
import User from "../models/user.js"
import Job from "../models/Job.js"
import { clerkClient } from "@clerk/express"
import { v2 as cloudnary } from "cloudinary"

// Get user data

export const getUserData = async (req, res) => {
    const auth = typeof req.auth === 'function' ? req.auth() : req.auth
    const userId = auth?.userId

    try {
        if (!userId) {
            return res.json({ success: false, message: 'Not authenticated' })
        }

        let user = await User.findById(userId)

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId)
            if (clerkUser) {
                const email = clerkUser.emailAddresses?.[0]?.emailAddress || ''
                const name = (clerkUser.firstName || clerkUser.lastName)
                    ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim()
                    : (email.split('@')[0] || 'User')

                await User.deleteMany({ email })

                user = await User.create({
                    _id: clerkUser.id,
                    name,
                    email,
                    image: clerkUser.imageUrl || '',
                    resume: ''
                })
            }
        }

        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Apply for a job 

export const applyForJob = async (req, res) => {
    const { jobId } = req.body

    const auth = typeof req.auth === 'function' ? req.auth() : req.auth
    const userId = auth?.userId
    try {
        const isAlreadyApplied = await JobApplications.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'You have Already Applied for this job' })
        }
        const jobData = await Job.findById(jobId)
        if (!jobData) {
            return res.json({ success: false, message: "No Such Job Found" })
        }
        await JobApplications.create({
            companyId: jobData.companyId,
            userId, jobId,
            date: Date.now()

        })
        res.json({ success: true, message: "Job applied successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get user applied applications

export const getUserJobApplications = async (req, res) => {
    try {
        const auth = typeof req.auth === 'function' ? req.auth() : req.auth
        const userId = auth?.userId


        const applications = await JobApplications.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!applications) {
            return res.json({ success: false, message: "No job applications found for this user" })
        }

        return res.json({ success: true, applications })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//update user profile (resume)

export const updateUserResume = async (req, res) => {
    try {
        const auth = typeof req.auth === 'function' ? req.auth() : req.auth
        const userId = auth?.userId

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudnary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }
        await userData.save()

        res.json({ success: true, message: "Resume updated successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}