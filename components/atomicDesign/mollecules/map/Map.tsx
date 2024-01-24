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

    useEffect(() => {

        console.log("fetch disponnible plant(that don't belong to a guardian) nearby lat +-0.009 lng +-0.009 put it into an array and map trhough this array to render Markers on the map if some plant has the same address, put them inside an array and render them in the current array.")

        const dataExemple = [
            {
                id: 122772,
                common_name: "Avocado",
                scientific_name: "Persea americana",
                image_url: "https://bs.plantnet.org/image/o/b4e83f95dce979319ad70321a9023400d7bf5f48",
                addresse: {
                    id: "uuid",
                    number: "1020",
                    street: "chemin de la montagne",
                    postCode: "38690",
                    city: "le grand lemps",
                    lat: "",
                    lng: ""
                },
                owner : {
                    id:'uuid',
                },
                guardian: null
            }
        ]
    }, [])



    return (
        <div className="w-full h-full z-0">
            {position &&
                <MapContainer center={position as LatLngExpression} zoom={15} scrollWheelZoom={false} style={{ height: '100vh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* position de l'user */}
                    <Marker position={position as LatLngExpression} >
                        <Popup className="">
                            You are here. 😉
                        </Popup>
                    </Marker>

                    {/** position des plantes à cliquer mapper à travers les plantes et afficher celles proches de l'user */}
                    <Marker position={[position[0] - 0.009, position[1] - 0.009]}>
                        <Popup>
                            <Card
                                isPressable
                                className="w-full p-2 flex flex-col items-center justify-center"
                                onClick={(e) => { console.log(e.target) }}>
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