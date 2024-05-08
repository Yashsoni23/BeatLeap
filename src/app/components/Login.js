"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex  flex-col object-contain max-[450px]:justify-center max-[450px]:items-center cursor-pointer  w-full h-full ">
        <Image
          src={"/Background.png"}
          layout="fill"
          alt="Bg"
          className="absolute -z-10"
        />
        <div className="flex w-full sm:w-1/2 flex-col gap-10">
          <h1 className="sm:text-3xl text-2xl font-semibold">
            Leap into Beat, <span className="text-[#2934D1]">User.</span>
          </h1>
          <h1 className="sm:text-2xl text-xl font-medium">
            Unleash your musical journey with{" "}
            <span className="text-[#581be8] textshadow font-bold">
              BeatLeap
            </span>
          </h1>
          <h1 className="sm:text-xl text-xl w-full sm:w-4/5 font-light">
            Access a vast collection of high-quality royalty-free music across
            various genres and moods.
          </h1>

          <div className="text-primary hover:bg-white/80 duration-300 transition-all  w-max flex justify-center items-center gap-3 rounded-lg bg-white">
            <span className="block bg-logo bg-cover w-[2rem] h-[2rem] m-2" />
            <span
              onClick={() => signIn("spotify")}
              className=" font-bold pr-3  text-xl sm:text-xl"
            >
              Login To BeatLeap
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
