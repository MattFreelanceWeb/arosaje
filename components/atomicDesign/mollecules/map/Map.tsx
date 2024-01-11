'use client'

// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect, useState } from "react"
import { LatLngExpression } from "leaflet"
import { Avatar, Button, Card, Chip } from "@nextui-org/react"


export default function MyMap(props: any) {


    const { zoom } = props

    const [position, setPosition] = useState<number[]>()


    useEffect(() => {

        if ("geolocation" in navigator) {
            // La géolocalisation est disponible
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setPosition([latitude, longitude])
                },
                (error) => {
                    console.error(`Erreur de géolocalisation: ${error.message}`);
                }
            );
        } else {
            console.error("La géolocalisation n'est pas disponible sur ce navigateur.");
        }

        return () => {
            // clean up 
        }
    }, [])


    return (
        <div className="w-full h-full z-0">
            {position &&
                <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* position de l'user */}
                    <Marker position={position as LatLngExpression} >
                        <Popup className="relative">
                            You are here. 😉
                            <div className="w-40 h-40 bg-blue-500 absolute -left-2 rounded-full opacity-50 animate-ping -z-10"></div>
                            <div className="w-40 h-40 bg-blue-500 absolute -left-2 rounded-full opacity-30 scale-110 animate-ping -z-10"></div>
                            <div className="w-40 h-40 bg-blue-500 absolute -left-2 rounded-full opacity-10 scale-125 animate-ping -z-10"></div>
                        </Popup>
                    </Marker>

                    {/** position des plantes à cliquer mapper à travers les plantes et afficher celles proches de l'user */}
                    <Marker position={[position[0] + 0.01, position[1] + 0.02]}>
                        <Popup>
                            <Card  
                                isPressable
                                className="w-full p-2 flex flex-col items-center justify-center"
                                onClick={()=>{console.log('hello world')}}>
                                <Avatar src="" name="Jhon Doe" size="sm" className="" />
                                <p>Plant Nbr. : </p><Chip color="primary">3</Chip>
                            </Card>
                        </Popup>
                    </Marker>

                </MapContainer>
            }
        </div>
    )
}