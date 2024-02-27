'use client'


import { Button, Input } from '@nextui-org/react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

function LoginSignup({ }: Props) {

    const [connection, setConnection] = useState<"login" | "signup">('signup')
    const [emailSignup, setEmailSignup] = useState("")
    const [passwordSignup, setPasswordSignup] = useState("")
    const [confirmPasswordSignup, setConfirmPasswordSignup] = useState("")
    const [validSignup, setValidSignup] = useState(false)


    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")

    const router = useRouter()

    const signUp = async (userData: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:8080/api/user/signup', {
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
            const response = await fetch('http://localhost:8080/api/user/login', {
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
            const token = responseData.token; // Supposons que le token se trouve dans la propriété "token" de la réponse
            localStorage.setItem('token', token);
            router.push("/")
            return responseData; // Si nécessaire
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Gérer l'erreur de manière appropriée
        }
    };


    return (
        <>
            {connection === 'signup' && (
                <form className='border-2 border-black rounded-md w-80 flex flex-col gap-8 md:w-3/4'>
                    <Input type="email" label="Email" value={emailSignup} onChange={(e) => { setEmailSignup(e.target.value) }} />
                    <Input type="password" label="password" value={passwordSignup} onChange={(e) => { setPasswordSignup(e.target.value) }} />
                    <Input type="password" label="Confirm password" value={confirmPasswordSignup} onChange={(e) => { setConfirmPasswordSignup(e.target.value) }} />
                    <div className='w-full flex items-center justify-around'>
                        <Button color='default' onClick={() => { setConnection('login') }}> pour login </Button>
                        <Button color='primary' onClick={() => {
                            signUp({ email: emailSignup, password: passwordSignup }).then((responseData) => {
                                setValidSignup(true)
                                setConnection("login")
                            })
                                .catch((error) => {
                                    setValidSignup(false)
                                });
                        }}> Click </Button>
                    </div>
                </form>
            )}
            {connection === 'login' && (
                <>
                    <h2>{validSignup && "bravo votre compte est créé, vous pouvez à présent vous connecter"}</h2>
                    <form className='border-2 border-black rounded-md w-80 flex flex-col gap-8 md:w-3/4'>
                        <Input type="email" label="Email" value={emailLogin} onChange={(e) => { setEmailLogin(e.target.value) }} />
                        <Input type="password" label="password" value={passwordLogin} onChange={(e) => { setPasswordLogin(e.target.value) }} />

                        <div className='w-full flex items-center justify-around'>
                            <Button
                                color='default'
                                onClick={() => { setConnection('signup') }}>
                                pour signup
                            </Button>
                            <Button color='primary' onClick={() => {
                                login({ email: emailLogin, password: passwordLogin }).then((responseData) => {
                                    // Traiter la réponse si nécessaire

                                })
                                .catch((error) => {
                                    // Gérer les erreurs de connexion
                                });
                            }}>Click</Button>
                        </div>
                    </form>
                </>


            )}
        </>
    )
}

export default LoginSignup