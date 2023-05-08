"use client"
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url'
import React from 'react'
const AUTH_URI = "https://accounts.spotify.com/authorize?client_id=006dbf49774c4c07bc93b4ef1f006518&response_type=code&show_dialog=true&redirect_uri=https://beatleap.netlify.app&scope=user-library-read%20user-read-playback-state%20user-top-read%20user-follow-read%20user-read-recently-played%20user-follow-read%20user-read-private%20playlist-read-private%20playlist-modify-private%20streaming%20user-read-private%20user-read-email"


const Login = () => {


  return (
    <>

      <div className="flex bg-violet-900 flex-col object-contain cursor-pointer  max-[450px]:bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:bg-hero bg-auto w-screen h-screen justify-center items-center">
        <div className="text-primary p-2 flex justify-center items-center gap-3 rounded-lg bg-white">
          <span className='block bg-logo bg-cover w-[3rem] h-[3rem] m-3' />
          <a href={AUTH_URI} className=' font-bold pr-3  text-2xl'>Login To BeatLeap</a>
        </div>

      </div>

    </>
  )
}

export default Login
