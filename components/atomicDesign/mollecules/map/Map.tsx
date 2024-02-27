'use client'

// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect, useState } from "react"
import { LatLngExpression } from "leaflet"
import { Avatar, Button, Card, Chip, Link } from "@nextui-org/react"

export default function MyMap(props: any) {


    const { zoom } = props

    const [position, setPosition] = useState<number[]>()
    const [plants, setPlants] = useState<any[]>([]);

    useEffect(() => {

        if ("geolocation" in navigator) {
            // La géolocalisation est disponible
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude +0.0005;
                    const longitude = position.coords.longitude +0.0005;

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
        const fetchPlants = async () => {

            //TODO: remplacer le token pour l'obtenir de manière dynamique

            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOjIsImlhdCI6MTcwOTA0Mzc0MSwiZXhwIjoxNzA5MDQ3MzQxfQ.7CBtNdP_ohiIwa-L6SVxs6ScqVhaY27l_vpWgPDeSf0";


  
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };
    
                const url = `http://localhost:8080/api/plant/by-coordinates/${position && position[0]}/${position && position[1]}`

                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                });
                if (!response.ok) {
                    console.log(response)
                    throw new Error("Erreur lors de la récupération des données des plantes");
                }
                const data = await response.json();

                //log for dev mode
                console.log(data.data)

                setPlants(data.data); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlants();
    }, [position]);



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
                    {
                        plants && (
                            <>
                                {plants.map((plant) => (

                                    <Marker key={plant.id} position={[plant.address.lat, plant.address.lng]}>

                                        <Popup className="">
                                            <Card isPressable as={Link} href={`/plant/userId=${plant.userId}&addressId=${plant.addressId}`} className="w-36 h-36 flex flex-col items-center justify-center gap-1 p-2">
                                                <Avatar name={plant.owner.email} />
                                                <h3>{plant.common_name}</h3>
                                                <p className="capitalize"> plante à garder: {plant.plants.length}</p>
                                                <Button color="primary">voir</Button>
                                            </Card>
                                        </Popup>
                                        
                                    </Marker>
                                ))}
                            </>
                        )
                    }

                </MapContainer>
            }
        </div>
    )
}


