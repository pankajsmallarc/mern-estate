import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className=" rounded-full object-cover cursor-pointer h-24 w-24 self-center mt-2" src={currentUser.avatar} alt='Profile' />
        <input type='text' id='username' placeholder='UserName' className='border p-3 border-pink-400 rounded-lg' />
        <input type='email' id='email' placeholder='Email' className='border p-3 border-pink-400 rounded-lg' />
        <input type='password' id='password' placeholder='Password' className='border p-3 border-pink-400 rounded-lg' />
      <button className='bg-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-500 cursor-pointer'>Delete account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile