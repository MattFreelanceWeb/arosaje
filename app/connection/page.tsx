import LoginSignup from '@/components/atomicDesign/mollecules/forms/LoginSignup'
import CookieBanner from '@/components/atomicDesign/mollecules/banner/CookieBanner'
import React from 'react'

type Props = {}

function Connection_page({}: Props) {


  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 '>
        <LoginSignup/>
        <CookieBanner/>
    </main>
  )
}

export default Connection_page