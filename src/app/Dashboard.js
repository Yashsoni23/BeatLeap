"use client";
import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import Navbar from './Navbar';
const Dashboard = ({code}) => {
    const getAccessCode = useAuth(code);
    const [accessToken, setAccessToken] = useState();
  
    useEffect(() => {
        setAccessToken(localStorage.getItem('accessToken'))
        if(accessToken){
            window.location = '/Home'
        }
    }, [])
    return (
        <>

            <Navbar/>

        </>
    )
}

export default Dashboard