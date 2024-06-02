'use client'

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { User } from "@/utils/interfaces"
import { useFetchUserFromToken } from '@/utils/customHooks'
const jwt = require("jsonwebtoken")


type Props = { userId: number, userName: string, imgSrc?: string }

function Profile({ userId, imgSrc, userName }: Props) {

    const user = useFetchUserFromToken()
    const router = useRouter()

    const signOut = async () => {
        try {
            localStorage.removeItem("token")
            router.push("/connection")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="absolute top-4 right-4 z-[1000]">
            <Popover placement="right">
                <PopoverTrigger>
                    <Avatar size="lg" name={userName} src={imgSrc ? imgSrc : ""} />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col items-center gap-4 p-2">
                        <Button as={Link} href={`/profil/${user?.id}`} className="bg-transparent">Mon profil</Button>
                        <Button color="danger" onClick={() => { signOut() }}>Se déconnecter</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </section>
    )
}

export default Profile
