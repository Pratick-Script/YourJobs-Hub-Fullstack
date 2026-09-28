import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'



const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)
    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCatagories, setSelectedCatagories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handelCatagories = (catagory) => {
        setSelectedCatagories(
            prev =>
                prev.includes(catagory) ? prev.filter(c => c !== catagory) : [...prev, catagory]
        )
    }
    const handleLocations = (location) => {
        setSelectedLocations(
            prev =>
                prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        const matchesCatagory = job =>
            selectedCatagories.length === 0 || selectedCatagories.includes(job.category)

        const matchesLocation = job =>
            selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle = job =>
            searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job =>
            searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job =>
                matchesCatagory(job) &&
                matchesLocation(job) &&
                matchesTitle(job) &&
                matchesSearchLocation(job)
        )
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)

    }, [jobs, selectedCatagories, selectedLocations, searchFilter])

    return (
        <div>
            <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 '>

                {/* sidebar */}
                <div className='w-full lg:w-1/4 bg-white px-4 border border-gray-200 p-4 shadow rounded-xl'>
                    {/* Search filter from hero component */}
                    {
                        isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                            <>
                                <h3 className='font-medium tet-lg mb-4'>Current Search</h3>
                                <div className='mb-4 text-gray-600'>
                                    {searchFilter.title && (
                                        <span className='inline-flex items-center gap-2.5 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded'>
                                            {searchFilter.title}
                                            <img onClick={e =>
                                                setSearchFilter(prev => ({ ...prev, title: "" }))}
                                                className='cursor-pointer' src={assets.cross_icon} alt="Cross Icon" />
                                        </span>
                                    )}
                                    {searchFilter.location && (
                                        <span className='ml-2 inline-flex items-center gap-2.5 bg-orange-50 border border-orange-200 px-4 py-1.5 rounded'>
                                            {searchFilter.location}
                                            <img
                                                onClick={e =>
                                                    setSearchFilter(prev => ({ ...prev, location: "" }))}
                                                className='cursor-pointer' src={assets.cross_icon} alt="Cross Icon" />
                                        </span>
                                    )}
                                </div>
                            </>
                        )
                    }
                    {/* Filter Button for small screen */}
                    <button onClick={e => setShowFilter(prev => !prev)} className='pc-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                        {showFilter ? "Close" : "Filters"}
                    </button>

                    {/* Catagory Filter */}

                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobCategories.map((catagory, index) => (
                                    <li className='flex gap-3 items-center' key={index}>
                                        <input
                                            className='scale-125'
                                            type="checkbox"
                                            onChange={() => handelCatagories(catagory)}
                                            checked={selectedCatagories.includes(catagory)}
                                        />
                                        {catagory}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/*Location Filter */}

                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4 pt-12'>Search by Location</h4>
                        <ul className='space-y-4 text-gray-600'>
                            {
                                JobLocations.map((Location, index) => (
                                    <li className='flex gap-3 items-center' key={index}>
                                        <input className='scale-125'
                                            type="checkbox"
                                            onChange={() => handleLocations(Location)}
                                            checked={selectedLocations.includes(Location)} />
                                        {Location}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                {/* Job listing */}

                <section className='w-full lg:w-3/4 text-gray-800 max-lg:p-4 ml-4'>
                    <h3 className='font-medium text-3xl py-2' id='job-list'>Featured Jobs</h3>
                    <p className='mb-8'>Hand-picked opportunities from top companies</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                        {filteredJobs.slice((currentPage - 1) * 6, (currentPage) * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                    </div>
                    {/* Pagination */}
                    {filteredJobs.length > 0 && (
                        <div className='flex items-center justify-center mt-10 space-x-2'>
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="" />
                            </a>
                            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                <a key={index} href="#job-list">
                                    <button onClick={() => { setCurrentPage(index + 1) }} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                                </a>
                            ))}
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                            </a>
                        </div>
                    )}
                </section>
            </div>

            {/* How YourJobs Works */}

            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-slate-900">How YourJobs Works</h2>
                        <p className="text-slate-500 text-sm mt-2">Three simple steps to land your next opportunity</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Search & Discover",
                                desc: "Use our powerful search to find jobs that match your skills, experience, and location preferences.",
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                ),
                                color: "bg-blue-100 text-blue-700",
                            },
                            {
                                step: "02",
                                title: "Apply with Ease",
                                desc: "Submit your application in minutes. Upload your resume, add a cover letter, and track your status in real time.",
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                                    </svg>
                                ),
                                color: "bg-cyan-100 text-cyan-700",
                            },
                            {
                                step: "03",
                                title: "Get Hired",
                                desc: "Hear back from companies fast. Track every application and prepare for interviews from your dashboard.",
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ),
                                color: "bg-emerald-100 text-emerald-700",
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
                                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-5`}>
                                    {item.icon}
                                </div>
                                <div className="text-xs font-mono text-slate-400 mb-2 tracking-widest">STEP {item.step}</div>
                                <h3 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JobListing