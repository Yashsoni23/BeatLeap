"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearchAlt, BiHomeAlt2, BiUserCircle } from "react-icons/bi";
import { CgStack } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { IoIosArrowDropdown } from "react-icons/io";
import SpotifyWebApi from "spotify-web-api-node";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useCustomContext } from "../context/customClient";

const spotifyWebAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

export default function Navbar() {
  const [accessToken, setAccessToken] = useState();
  const session = useSession();
  const context = useCustomContext();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    image: "",
    premium: "",
  });
  const [toggle, setToggle] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    setAccessToken(context.accessToken);
  }, [context.accessToken, context, accessToken]);

  useEffect(() => {
    if (accessToken) {
      spotifyWebAPI.setAccessToken(accessToken);
      spotifyWebAPI.getMe().then((data) => {
        console.log(data);
        setUserInfo({
          name: data.body.display_name,
          email: data.body.email,
          image: data.body.images[0].url,
          premium: data.body.premium,
        });
      });
    } else {
      return;
    }
  }, [accessToken]);

  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="flex sticky top-0 z-50 bg-gradient-to-t from-black to-gray-800 justify-center sm:justify-between sm:p-2 sm:px-10 w-full h-max">
      <div className="flex z-[99] max-[450px]:bg-gradient-to-t from-black to-gray-800 max-[450px]:w-full relative justify-between sm:justify-center  px-2 items-center">
        <span className="block bg-logo bg-cover w-[2rem] h-[2rem] m-3" />
        <h1
          className="text-primary text-xl font-bold text-center cursor-pointer"
          onClick={handleLogout}
        >
          BeatLeap
        </h1>
        {toggleNav ? (
          <HiOutlineMenuAlt2
            className=" flex sm:hidden  top-3 text-primary  text-3xl font-bold"
            onClick={() => setToggleNav(!toggleNav)}
          />
        ) : (
          <HiOutlineMenuAlt2
            className=" flex sm:hidden  top-3 text-primary  text-3xl font-bold"
            onClick={() => setToggleNav(!toggleNav)}
          />
        )}
      </div>

      {toggleNav ? (
        <div
          className={`absolute ${
            toggleNav ? "slideInDown" : "slideOutUp"
          }   shadow-2xl flex flex-col gap-4 top-14 w-full  z-40 rounded-2xl  bg-slate-700  `}
        >
          <Link
            href="/"
            className="flex pt-3 justify-center gap-3 items-center"
          >
            <BiHomeAlt2 />
            Home
          </Link>
          <Link
            href="/Search"
            className="flex justify-center gap-3 items-center"
          >
            <BiSearchAlt />
            Search
          </Link>
          <Link
            href="/Beatstack"
            className="flex justify-center gap-3 items-center"
          >
            <CgStack />
            Beat Stack
          </Link>
          <Link
            href="/Liked"
            className="flex justify-center gap-3 items-center"
          >
            <AiOutlineHeart />
            Liked
          </Link>
          <div
            onClick={() => setToggle(!toggle)}
            className="flex cursor-pointer relative justify-center gap-3 items-center text-l-white p-2 rounded-full bg-gradient-to-t from-gray-900 to-[#2934D1]"
          >
            <BiUserCircle />
            User{" "}
            <IoIosArrowDropdown
              className={toggle ? "rotate-180" : "rotate-0"}
            />
            <div
              className={`absolute z-30  ${
                toggle
                  ? "zoomInUp flex  flex-col justify-center items-center"
                  : "hidden zoomOutDown"
              } cursor-default w-full  gap-4 top-11 shadow-2xl right-0 z-50 rounded-2xl  bg-slate-900 p-2 `}
            >
              <Image
                src={userInfo.image}
                alt="user-image"
                className="rounded-full"
                width={70}
                height={70}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-center text-xl">
                  {userInfo.name}
                </h3>
                <h6 className="text-lg text-center">{userInfo.email}</h6>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="lg:flex hidden justify-center text-primary font-bold gap-10 text-[1.5vw] items-center">
        <Link href="/" className="flex justify-center gap-3 items-center">
          <BiHomeAlt2 />
          Home
        </Link>
        <Link href="/Search" className="flex justify-center gap-3 items-center">
          <BiSearchAlt />
          Search
        </Link>
        <Link
          href="/Beatstack"
          className="flex justify-center gap-3 items-center"
        >
          <CgStack />
          Beat Stack
        </Link>
        <Link href="/Liked" className="flex justify-center gap-3 items-center">
          <AiOutlineHeart />
          Liked
        </Link>
        <div
          onClick={() => setToggle(!toggle)}
          className="flex cursor-pointer relative justify-center gap-3 items-center text-l-white p-2 rounded-full bg-gradient-to-t from-gray-900 to-[#2934D1]"
        >
          <BiUserCircle />
          User{" "}
          <IoIosArrowDropdown className={toggle ? "rotate-180" : "rotate-0"} />
          <div
            className={`absolute ${
              toggle ? "flex" : "hidden"
            } cursor-default w-max  gap-4 top-16 right-0 z-50 rounded-2xl  bg-slate-700 p-2 `}
          >
            <img
              src={userInfo.image}
              alt="user-image"
              className="rounded-full"
              width={70}
              height={70}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-xl">{userInfo.name}</h3>
              <h6 className="text-lg">{userInfo.email}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
