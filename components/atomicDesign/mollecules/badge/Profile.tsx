'use client'

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const jwt = require("jsonwebtoken")



type Props = { userId: number, userName: string, imgSrc?: string }




function Profile({ userId, imgSrc, userName }: Props) {
    interface User {
        id: number;
        userName: string;
        email: string;
        address: Address[];
        plantsOwned: Plant[];
        plantsGuarded: Plant[];
    }

    interface Address {
        id: number;
        number: number;
        street: string;
        postalCode: number;
        city: string;
        country: string;
        lat: number;
        lng: number;
        userId: number;
        createdAt: string;
        updatedAt: string;
    }

    interface Plant {
        common_name: string;
        scientific_name: string;
        image_url: string;
    }

    interface PlantData {
        common_name?: string;
        scientific_name?: string;
        image_url?: string;
        addressId?: number;
    }

    const [user, setUser] = useState<User>()

    const router = useRouter()

    const signOut = async () => {
        try {
            localStorage.removeItem("token")
            router.push("/connection")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {


        const fetchUser = async () => {

            try {

                const token = localStorage.getItem("token")
                const decodedToken = await jwt.decode(token, { complete: true });

                const userId = await decodedToken.payload.userId

                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const url = `http://localhost:8080/api/user/${userId}`

                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                });
                if (!response.ok) {
                    if (response.status === 403) {
                        localStorage.removeItem('token')
                        router.push("/connection")
                    }
                    console.log(response)
                    throw new Error("Erreur lors de la récupération des données des plantes");
                }
                const data = await response.json();

                //log for dev mode
                console.log(data)

                setUser({ ...data, id: userId });
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser()

    }, [, router])

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

// 