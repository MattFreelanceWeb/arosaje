'use client'


import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {}

function LoginSignup({ }: Props) {

    const [connection, setConnection] = useState<"login" | "signup">('signup')

    return (
        <>
            {connection === 'signup' && (
                <form className='border-2 border-black rounded-md w-80  flex flex-col gap-8 md:w-3/4'>
                    <Input type="email" label="Email" />
                    <Input type="password" label="password" />
                    <Input type="password" label="Confirm password" />
                    <div className='w-full flex items-center justify-around'>
                        <Button color='default' onClick={() => { setConnection('login') }}> pour login </Button>
                        <Button color='primary'>Click</Button>
                    </div>
                </form>
            )}
            {connection === 'login' && (
                <form className='border-2 border-black rounded-md w-80 flex flex-col gap-8 md:w-3/4'>
                    <Input type="email" label="Email" />
                    <Input type="password" label="password" />

                    <div className='w-full flex items-center justify-around'>
                        <Button
                            color='default'
                            onClick={() => { setConnection('signup') }}>
                            pour signup
                        </Button>
                        <Button color='primary'>Click</Button>
                    </div>
                </form>
            )}
        </>
    )
}

export default LoginSignup