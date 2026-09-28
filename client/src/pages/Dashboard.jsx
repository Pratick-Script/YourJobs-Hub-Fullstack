import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  const Navigate = useNavigate()

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

  //Function to logout for company 

  const logout = () => {
    setCompanyData(null)
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    localStorage.removeItem('companyData')
    Navigate('/')
  }

  useEffect(() => {
    if (companyData) {
      Navigate('/dashboard/manage-job')
    }
  }, [companyData])


  return (
    <div className='min-h-screen'>

      {/* Navbar for recruiter panel */}

      <div className='shadow py-4 sticky top-0 z-50 bg-white'>
        <div className='px-5 flex justify-between items-center'>
          <img onClick={e => (Navigate('/'))} className='h-10 max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
          {companyData && (
            <div className='flex gap-3 items-center'>

              <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
              <div className='relative group'>
                <img className='w-8 border rounded-full border-gray-200' src={companyData.image} alt="" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md border border-gray-200 text-sm'>
                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sidebar */}

      <div className='flex items-start'>

        {/* Left sidebar with option add job,manage job, ViewApplications */}

        <div className='inline-block min-h-screen border-r-2 border-gray-200'>
          <ul className='flex flex-col items-start pt-5 text-gray-800'>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-purple-100 border-r-4 border-purple-500'}`} to={'/dashboard/add-job'}>
              <img className='min-w-5' src={assets.add_icon} alt="" />
              <p className='max-sm:hidden'>Add Job  </p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-purple-100 border-r-4 border-purple-500'}`} to={'/dashboard/manage-job'}>
              <img className='min-w-5' src={assets.home_icon} alt="" />
              <p className='max-sm:hidden'>Manage Job</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-purple-100 border-r-4 border-purple-500'}`} to={'/dashboard/view-application'}>
              <img className='min-w-5' src={assets.person_tick_icon} alt="" />
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div className='flex-1 h-full p-2 sm:p-5'>
          <Outlet />
        </div>
      </div>


    </div>
  )
}

export default Dashboard