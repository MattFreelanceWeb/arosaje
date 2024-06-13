'use client'


import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Logo from "@/res/logo.webp"
import Link from 'next/link'

type Props = {}

function LoginSignup({ }: Props) {

    const [connection, setConnection] = useState<"loginEmail" | "loginPwd" | "signup">('signup')
    const [emailSignup, setEmailSignup] = useState("")
    const [passwordSignup, setPasswordSignup] = useState("")
    const [confirmPasswordSignup, setConfirmPasswordSignup] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [validSignup, setValidSignup] = useState(false)
    const [signupDisable, setSignupDisable] = useState(true)


    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")

    const router = useRouter()

    const signUp = async (userData: { email: string, password: string }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            const responseData = await response.json();
            console.log('User signed up successfully:', responseData);
            return responseData; // Si nécessaire
        } catch (error) {
            console.error('Error signing up:', error);
            throw error; // Gérer l'erreur de manière appropriée
        }
    };

    const login = async (credentials: { email: string, password: string }) => {



        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            const responseData = await response.json();
            console.log('User logged in successfully:', responseData);
            const token = responseData.token;
            localStorage.setItem('token', token);
            router.push("/")
            return responseData;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    useEffect(() => {

        if (passwordSignup.length < 2) {
            setSignupDisable(true)
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordSignup)) {
            setSignupDisable(true)
        } else if (passwordSignup !== confirmPasswordSignup) {
            setSignupDisable(true)
        } else if (!acceptTerms) {
            setSignupDisable(true)
        }
        else {
            setSignupDisable(false)
        }


    }, [passwordSignup, confirmPasswordSignup, acceptTerms])



    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full '>
                <Image src={"https://cdn.pixabay.com/photo/2016/11/19/11/11/hands-1838658_960_720.jpg"} alt="" className='object-cover h-full w-full' width={1280} height={956} />
            </div>

            {connection === 'signup' && (
                <form className=' rounded-md w-80 flex flex-col gap-8 md:w-3/4 p-8 backdrop-blur-xl bg-white/30 max-w-[700px]'>
                    <div className='w-full flex itemx-center justify-center '>
                        <Image src={Logo} alt='' />
                    </div>
                    <Input type="email" label="Email" value={emailSignup} onChange={(e) => { setEmailSignup(e.target.value) }} />
                    <Input type="password" label="password" value={passwordSignup} onChange={(e) => { setPasswordSignup(e.target.value) }} />
                    <Input type="password" label="Confirm password" value={confirmPasswordSignup} onChange={(e) => { setConfirmPasswordSignup(e.target.value) }} />
                    <div className='w-full flex items-center justify-around gap-8'>
                        <Button onClick={() => { setConnection('loginEmail') }} variant='shadow'> I have an account </Button>
                        <Button color='primary' isDisabled={signupDisable} onClick={() => {
                            signUp({ email: emailSignup, password: passwordSignup }).then((responseData) => {
                                setValidSignup(true)
                                setConnection("loginEmail")
                            })
                                .catch((error) => {
                                    setValidSignup(false)
                                });
                        }}> Sign-up </Button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label htmlFor="acceptTerms" className="ml-2 text-sm">
                            J&apos;accepte les{" "}
                            <Link
                                href="/userTerms" target="_blank" className="underline">
                                conditions générales d&apos;utilisation
                            </Link>
                        </label>
                    </div>
                </form>
            )}
            {connection === 'loginEmail' && (
                <>
                    <form className='rounded-md w-80 flex flex-col gap-8 md:w-3/4 p-8 bg-white/30 backdrop-blur-xl max-w-[700px]'>
                        <div className='w-full flex itemx-center justify-center '>
                            <Image src={Logo} alt='' />
                        </div>
                        <h2 className='text-white'>{validSignup && "Votre compte est créé, vous pouvez à présent vous connecter"}</h2>
                        <Input type="email" label="Email" value={emailLogin} onChange={(e) => { setEmailLogin(e.target.value) }} />

                        <div className='w-full flex items-center justify-around'>
                            <Button
                                variant='ghost'
                                onClick={() => { setConnection('signup') }}>
                                I need an account
                            </Button>
                            <Button isDisabled={!(emailLogin.length > 0)} color='primary' onClick={() => {
                                setConnection("loginPwd")
                            }}>Suivant</Button>
                        </div>
                    </form>
                </>


            )}

            {connection === 'loginPwd' && (
                <>


                    <form className='rounded-md w-80 flex flex-col gap-8 md:w-3/4 p-8 bg-white/30 backdrop-blur-xl max-w-[700px]'>
                        <Input type="password" label="password" value={passwordLogin} onChange={(e) => { setPasswordLogin(e.target.value) }} />

                        <div className='w-full flex items-center justify-around'>
                            <Button
                                variant='ghost'
                                onClick={() => { setConnection('signup') }}>
                                I need an account
                            </Button>
                            <Button isDisabled={!(passwordLogin.length > 0)} color='primary' onClick={() => {
                                login({ email: emailLogin, password: passwordLogin }).then((responseData) => {


                                })
                                    .catch((error) => {

                                    });
                            }}>Log in</Button>
                        </div>
                    </form>
                </>


            )}
        </>
    )
}

export default LoginSignup