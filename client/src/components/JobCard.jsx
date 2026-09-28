import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"



const JobCard = ({ job }) => {

    const navigate = useNavigate()

    if (!job) return null

    return (
        <div className='border border-gray-200 p-4 shadow rounded-2xl hover:scale-105 hover:border-purple-400'>
            <div>
                <div className='flex justify-between items-center'>
                    <img className='h-8 object-contain' src={job.companyId?.image || assets.company_icon} alt={job.companyId?.name || "company_logo"} />
                </div>
                <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
                <div className='flex items-center gap-3 mt-3 text-xs'>
                    <span className='inline-flex items-center gap-2.5 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded text-xs'>{job.location}</span>
                    <span className='inline-flex items-center gap-2.5 bg-green-50 border border-green-200 px-4 py-1.5 rounded text-xs'>{job.level}</span>
                </div>
                <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description ? job.description.slice(0, 150) : '' }} />
                <div className='flex mt-4 text-sm gap-4'>
                    <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-purple-600 text-white px-4 sm:px-6 py-2 rounded cursor-pointer hover:bg-violet-800'>Apply now</button>
                    <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='border border-gray-500 px-4 sm:px-6 py-2 rounded'>Learn more</button>
                </div>
            </div>

        </div>
    )
}

export default JobCard