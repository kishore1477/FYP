import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector((state)=>state?.user)
  return (
    <div className='md:flex  mt-40 justify-around  mx-2'>
        
<div className=''>
    
<div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Name
  </label>
  <input
    type="text"
    id="name"
    name="firstName"
    disabled
    value={user?.firstName}
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>
</div>
<div >
    
<div className="relative mb-4">
  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    disabled
    value={user?.email}
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>
</div>

    </div>
  )
}

export default Profile