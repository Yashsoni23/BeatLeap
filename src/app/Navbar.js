"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiSearchAlt, BiHomeAlt2, BiUserCircle } from "react-icons/bi"
import { CgStack } from "react-icons/cg"
import { AiOutlineHeart } from "react-icons/ai"
import { IoIosArrowDropdown } from "react-icons/io"
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyWebAPI = new SpotifyWebApi({
    clientId: process.env.clientId,
});

export default function Navbar() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        image: "",
        premium: "",
    })
    let accessToken = localStorage.getItem('accessToken');
    const [toggle, setToggle] = useState(false);
    useEffect(() => {

        spotifyWebAPI.setAccessToken(accessToken);
        spotifyWebAPI.getMe().then((data) => {
            console.log(data);
            setUserInfo({
                name: data.body.display_name,
                email: data.body.email,
                image: data.body.images[0].url,
                premium: data.body.premium,
            })
        });

    }, [accessToken])
    return (
        <div className='flex bg-gradient-to-t from-black to-gray-800 justify-between p-2 px-10 w-screen h-max'>
            <div className="flex justify-center items-center">
                <span className='block bg-logo bg-cover w-[3rem] h-[3rem] m-3' />
                <h1 className='text-primary text-3xl font-bold text-center'>
                    BeatLeap
                </h1>
            </div>

            <div className="lg:flex hidden justify-center text-primary font-bold gap-10 text-3xl  items-center">
                <Link href='/Home' className='flex justify-center gap-3 items-center'><BiHomeAlt2 />Home</Link>
                <Link href='/Search' className='flex justify-center gap-3 items-center'><BiSearchAlt />Search</Link>
                <Link href='/beatstack' className='flex justify-center gap-3 items-center'><CgStack />Beat Stack</Link>
                <Link href='/liked' className='flex justify-center gap-3 items-center'><AiOutlineHeart />Liked</Link>
                <div onClick={()=>setToggle(!toggle)} className='flex cursor-pointer relative justify-center gap-3 items-center text-l-white p-3 rounded-full bg-gradient-to-t from-gray-900 to-[#2934D1]'><BiUserCircle />User <IoIosArrowDropdown className={toggle?"rotate-180":"rotate-0"}/>
                    <div className={`absolute ${toggle?"flex":"hidden"} cursor-default w-max  gap-4 top-16 right-0 z-50 rounded-2xl  bg-slate-700 p-4 `}>
                        <img src={userInfo.image} alt="user-image" className='rounded-full' width={80} height={80} />
                        <div className="flex flex-col gap-1">
                            <h3 className='text-white text-2xl'>{userInfo.name}</h3>
                            <h6 className='text-xl'>{userInfo.email}</h6>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
