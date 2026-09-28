import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useAuth, useUser } from '@clerk/react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Applications = () => {

    const { user } = useUser();
    const { getToken } = useAuth();

    const [isEdit, setIsEdit] = useState(false)
    const [resume, setResume] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [showResumeModal, setShowResumeModal] = useState(false)

    const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

    const updateResume = async () => {
        if (!resume) {
            toast.error("Please select a resume file first")
            return
        }

        try {
            setIsUploading(true)
            const formData = new FormData()
            formData.append("resume", resume)
            const token = await getToken()
            const { data } = await axios.post(`${backendUrl}/api/users/update-resume`,
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (data.success) {
                toast.success(data.message)
                await fetchUserData()
                setIsEdit(false)
                setResume(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
                <h2 className='text-xl font-semibold'>Your Resume</h2>
                <div className='flex flex-wrap items-center gap-3 mb-6 mt-3'>
                    {
                        isEdit || (userData && userData.resume === "")
                            ? <>
                                <label className='flex items-center' htmlFor="resumeUpload">
                                    <p className='bg-purple-100 text-purple-600 px-4 py-2 rounded-lg mr-2 cursor-pointer hover:bg-purple-200 transition'>
                                        {resume ? resume.name : "Select Resume (PDF)"}
                                    </p>
                                    <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                                    <img className='cursor-pointer' src={assets.profile_upload_icon} alt="Upload" />
                                </label>
                                <button
                                    onClick={updateResume}
                                    disabled={isUploading}
                                    className='bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-lg px-5 py-2 cursor-pointer transition font-medium'
                                >
                                    {isUploading ? 'Saving...' : 'Save'}
                                </button>
                                {userData && userData.resume && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setShowResumeModal(true)}
                                            className='bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 rounded-lg px-4 py-2 cursor-pointer transition flex items-center gap-1.5'
                                        >
                                            View Current Resume
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setIsEdit(false); setResume(null); }}
                                            className='text-gray-500 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer transition'
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </>
                            :
                            <div className='flex flex-wrap items-center gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setShowResumeModal(true)}
                                    className='bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition font-medium'
                                >
                                    <span>View Resume</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => setIsEdit(true)}
                                    className='text-gray-600 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer transition'
                                >
                                    Edit
                                </button>
                            </div>
                    }
                </div>

                <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead>
                        <tr>
                            <th className='py-3 px-4 border-b border-gray-200 text-left'>Company</th>
                            <th className='py-3 px-4 border-b border-gray-200 text-left'>Job Title</th>
                            <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>Location</th>
                            <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>Date</th>
                            <th className='py-3 px-4 border-b border-gray-200 text-left'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userApplications.map((job, index) => job.companyId && job.jobId ? (
                            <tr key={index}>
                                <td className='flex items-center px-4 py-3 gap-2 border-b border-gray-200'>
                                    <img className='w-8 h-8' src={job.companyId.image} alt="" />
                                    {job.companyId.name}
                                </td>
                                <td className='px-4 py-3 border-b border-gray-200'>{job.jobId.title}</td>
                                <td className='px-4 py-3 border-b border-gray-200 max-sm:hidden'>{job.jobId.location}</td>
                                <td className='px-4 py-3 border-b border-gray-200 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                                <td className='px-4 py-3 border-b border-gray-200'>
                                    <span className={`${job.status === 'Accepted' ? 'bg-green-100 text-green-600' : job.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'} px-4 py-2 rounded`}>
                                        {job.status}
                                    </span>
                                </td>
                            </tr>
                        ) : (null))}
                    </tbody>
                </table>
            </div>

            {/* Resume Preview Modal */}
            {showResumeModal && (
                <div
                    onClick={() => setShowResumeModal(false)}
                    className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn'
                    >
                        {/* Modal Header */}
                        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50'>
                            <div className='flex items-center gap-3'>
                                <h3 className='text-lg font-semibold text-gray-800'>Your Resume</h3>
                                <span className='text-xs bg-green-100 text-green-700 font-medium px-2.5 py-0.5 rounded-full'>Uploaded</span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <a
                                    href={userData?.resume}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-sm bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition flex items-center gap-1.5'
                                >
                                    <span>Open in New Tab</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                <button
                                    type='button'
                                    onClick={() => setShowResumeModal(false)}
                                    className='p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition cursor-pointer'
                                    aria-label="Close"
                                >
                                    <img src={assets.cross_icon} alt="Close" className='w-4 h-4' />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className='flex-1 w-full bg-gray-100 p-2 overflow-hidden flex flex-col'>
                            {userData?.resume ? (
                                <iframe
                                    src={`${userData.resume}#toolbar=1`}
                                    title="Resume Preview"
                                    className='w-full h-full rounded-lg border border-gray-200 bg-white'
                                />
                            ) : (
                                <div className='flex items-center justify-center h-full text-gray-500'>
                                    No resume uploaded yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}

export default Applications