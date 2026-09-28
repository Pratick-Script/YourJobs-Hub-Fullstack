import Company from "../models/Company.js"
import bcrypt from 'bcrypt'

import { v2 as cloudinary } from 'cloudinary'

import generateToken from "../utils/generateToken.js"
import Job from "../models/Job.js"
import JobApplications from "../models/jobApplications.js"


//Register a new company


export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: 'All fields required' })
    }

    try {
        const companyExist = await Company.findOne({ email })

        if (companyExist) {
            return res.json({ success: false, message: 'Company Already Exist' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id),
            message: 'Company registered successfully'
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Compny login

export const loginCompany = async (req, res) => {
    const { email, password } = req.body

    try {
        const company = await Company.findOne({ email })
        if (company && await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id),
                message: 'Company logged in successfully'
            })
        } else {
            res.json({ success: false, message: 'Invalid email or password' })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get company data

export const getCompanyData = async (req, res) => {
    try {
        const company = req.company
        res.json({ success: true, company })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Post a new job

export const postJob = async (req, res) => {


    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id
    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newJob.save()
        res.json({
            success: true,
            message: 'Job posted successfully',
            newJob,
        })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

//Get company Job Applicants

export const getCompanyJobApplicants = async (req, res) => {
    try {

        const companyId = req.company._id
        //Find job applications for the user and populate realted data

        const applicants = await JobApplications
            .find({ companyId })
            .populate("userId", "name image email resume")
            .populate("jobId", 'title location category level salary')
            .exec()

        res.json({ success: true, applicants, applications: applicants })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



// Get company Posted jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id

        const jobs = await Job.find({ companyId })

        // Adding No. of applicants info in data
        const jobsData = await Promise.all(
            jobs.map(async (job) => {
                const applicants = await JobApplications.find({ jobId: job._id });
                return { ...job.toObject(), applicants: applicants.length }
            })
        )

        res.json({ success: true, jobsData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Change job Application status
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body

        // find job application and update status
        await JobApplications.findOneAndUpdate({ _id: id }, { status })

        res.json({ success: true, message: 'Status Changed' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Change job visibility
export const changeVisibility = async (req, res) => {
    try {
        const { id } = req.body

        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible

            await job.save()

            res.json({
                success: true,
                job,
                message: "Job visibility changed successfully"
            })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}