"use client";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session);
    if (session.status === "authenticated") {
      router.refresh();
    }
  }, [session.data?.accessToken, router, session]);
  return <>{session.status === "authenticated" ? <Dashboard /> : <Login />}</>;
}
