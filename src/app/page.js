'use client';
import Image from 'next/image'

import Login from './Login'
import {  useSearchParams } from 'next/navigation';
import Dashboard from './Dashboard';


export default function Home() {
  const router = useSearchParams();
  const code = router.get('code');
  return (
    <>
    {
      code ? <Dashboard /> : <Login/>
    }
    </>
  )
}
