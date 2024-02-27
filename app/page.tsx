'use client'

import { isAuthContext } from "@/components/atomicDesign/appContext/authContext";
import HomePage from "@/components/atomicDesign/organisms/homePage/HomePage";
import { useContext } from "react";




export default function Home() {

  const { isAuth, setIsAuth } = useContext(isAuthContext);

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <HomePage/>
    </main>
  )
}
