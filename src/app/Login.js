"use client"
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url'
import React from 'react'
const AUTH_URI = "https://accounts.spotify.com/authorize?client_id=4960c221309f4d25893983545761004f&response_type=code&show_dialog=true&redirect_uri=https://beatleap.netlify.app&scope=user-library-read%20user-read-playback-state%20user-top-read%20user-follow-read%20user-read-recently-played%20user-follow-read%20user-read-private%20playlist-read-private%20playlist-modify-private%20streaming%20user-read-private%20user-read-email"


const Login = () => {


  return (
    <>

     <div className="flex bg-violet-900 flex-col object-contain max-[450px]:justify-center max-[450px]:items-center cursor-pointer  max-[450px]:bg-gradient-to-r from-violet-500 p-20 to-fuchsia-500 bg-hero bg-cover w-screen h-screen ">
        <div className="flex w-full sm:w-1/2 flex-col gap-10">
          <h1 className='sm:text-6xl text-3xl font-semibold'>Leap into Beat, <span className='text-[#2934D1]'>User.</span></h1>
          <h1 className='sm:text-3xl text-2xl font-medium'>Unleash your musical journey with <span className='text-[#581be8]'>BeatLeap</span>
          </h1>
          <h1 className='sm:text-3xl text-xl w-full sm:w-4/5 font-light'>Access a vast collection of high-quality royalty-free music across various genres and moods.</h1>

          <div className="text-primary  w-max flex justify-center items-center gap-3 rounded-lg bg-white">
            <span className='block bg-logo bg-cover w-[3rem] h-[3rem] m-2' />
            <a href={AUTH_URI} className=' font-bold pr-3  text-xl sm:text-2xl'>Login To BeatLeap</a>
          </div>
        </div>



      </div>

    </>
  )
}

export default Login
