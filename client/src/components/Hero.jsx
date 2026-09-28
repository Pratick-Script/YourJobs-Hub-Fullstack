import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titileRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titileRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10 max-lg:ml-2'>
            <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-800 text-white py-16 text-center mx-2 rounded-2xl'>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-5">
                    Find Your Dream<br />
                    <span className="text-cyan-400">Job Today</span>
                </h1>
                <h2 className='text-3xl md:text-3xl lg:text-4xl font-medium mb-4 text-blue-200'>Over 12,000 jobs available right now</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'> Discover Your Dream Job. Build Your Future.
                    Explore opportunities that match your skills and take the next step in your career.
                </p>
                <div className='flex justify-between items-center bg-white rounded-xl text-gray-600 pl-4 max-w-xl mx-4 sm:mx-auto px-1'>
                    <div className='flex items-center'>
                        <img className='sm:h-5 h-4' src={assets.search_icon} alt="Search Icon" />
                        <input type="text"
                            placeholder='Search for jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={titileRef} />
                    </div>
                    <div className=' flex items-center'>
                        <img className='sm:h-5 h-4' src={assets.location_icon} alt="Location Icon" />
                        <input type="text"
                            placeholder='Location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={locationRef} />
                    </div>
                    <button onClick={onSearch} className='bg-purple-600 px-4 py-2 rounded text-white m-1 outline-none cursor-pointer'>Find Job</button>
                </div>
            </div>

            <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-12 lg:gap-16 flex-wrap'>
                    <p className='font-medium text-gray-500'>Trusted By</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="Microsoft Logo" />
                    <img className='h-7' src={assets.google_logo} alt="Google Logo" />
                    <img className='h-6' src={assets.walmart_logo} alt="Walmart Logo" />
                    <img className='h-6' src={assets.accenture_logo} alt="Accenture Logo" />
                    <img className='h-6' src={assets.adobe_logo} alt="Adobe Logo" />
                    <img className='h-6' src={assets.samsung_logo} alt="Samsung Logo" />
                    <img className='h-6' src={assets.amazon_logo} alt="Amazon Logo" />
                </div>
            </div>

        </div>
    )
}

export default Hero