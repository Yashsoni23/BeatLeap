"use client";
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import Navbar from './Navbar';
import { Router, useRouter } from 'next/router';

const Dashboard = ({code}) => {
    const getAccessCode = useAuth(code);
    const router =  useRouter();
    let accessToken;
  
    useEffect(() => {
        accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            router.push('/Home')
        }
    }, [])
    return (
        <>
            <Navbar/>

        </>
    )
}

export default Dashboard