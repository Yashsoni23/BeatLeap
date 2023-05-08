'use client';
import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState('yash')
  const [expiresIn, setExpiresIn] = useState()
  // setAccessToken('kmk')
  useEffect(() => {
    Login()
  }, [])
  function Login() {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.access_token)
        setRefreshToken(res.data.refresh_token)
        setExpiresIn(res.data.expires_in)
        localStorage.setItem("accessToken", res.data.access_token);
        window.history.pushState({}, null, "/Home")
      })
      .catch(() => {
        window.location = "/"
      })
  }
  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return
    }
    else {
      const timeout = setTimeout(() => {
        console.log(refreshToken, expiresIn, "refreshToken, expiresIn");
        axios
          .post("http://localhost:3001/refresh", {
            refreshToken,
          })
          .then(res => {
            setAccessToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            setExpiresIn(res.data.expires_in)
            localStorage.setItem("accessToken", res.data.access_token);

          })
          .catch(() => {
            window.location = "/"
          })
      }, (expiresIn - 120) * 1000)

      return () => clearTimeout(timeout)
    }

  }, [refreshToken, expiresIn])

  return accessToken
}