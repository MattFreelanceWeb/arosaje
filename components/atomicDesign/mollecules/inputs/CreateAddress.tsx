import { Button } from '@nextui-org/button'
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
const jwt = require("jsonwebtoken")


type Props = {}

function CreateAddress({ }: Props) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [number, setNumber] = useState<number | undefined>()
    const [street, setStreet] = useState<string | undefined>()
    const [postalCode, setPostalCode] = useState<number | undefined>()
    const [city, setCity] = useState<string | undefined>()
    const [latitude, setLatitude] = useState<number | undefined>()
    const [longitude, setLongitude] = useState<number | undefined>()


    const [adressSelected, setAdressSelected] = useState<[latitude: number, longitude: number]>()

    const fetchLatLngFromGvt = async (addressObj: { number: number, street: string, postalCode: number, city: string }) => {

        // exemple string address needed -> 1020+chemin+de+la+montagne+38690+le+grand+lemps
        const valeurs = Object.values(addressObj).map(value => String(value).replace(/ /g, "+"));
        const queryString = valeurs.join("+")

        console.log(queryString)

        try {
            const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${queryString}`, { method: "GET" });
            const data = await reponse.json()
            const latLng = data.features[0].geometry.coordinates
            setLatitude(latLng[0])
            setLongitude(latLng[1])
            return latLng

        } catch (error: any) {
            console.error(`Erreur lors du téléchargement : ${error}`);
        }
    }

    const createAddress = async (address: { number: number, street: string, postalCode: number, city: string }) => {

        await fetchLatLngFromGvt({
            number: number as number,
            street: street as string,
            postalCode: postalCode as number,
            city: city as string,
        })
        if (!!latitude && !!longitude) {
            try {
                const token = localStorage.getItem("token")
                const decodedToken = await jwt.decode(token, { complete: true });

                const userId = await decodedToken.payload.userId

                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const response = await fetch(`http://localhost:8080/api/address/${userId}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ ...address, lat: latitude, lng: longitude , country:"france"}),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la création de la plante');
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                throw new Error("Une erreur est survenue lors de la création de l'adresse");
            }
        }

    };

    // function to clear modal onclose
    const clear = () => {
        setNumber(undefined)
        setCity(undefined)
        setStreet(undefined)
        setPostalCode(undefined)
        setLatitude(undefined)
        setLongitude(undefined)
    }


    return (
        <>
            <Button onPress={onOpen} fullWidth color='primary'> <span className='font-bold text-xl'>+</span>Create a new Address </Button>
            <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange} className={`max-h-[80%] overflow-y-auto ${isOpen ? 'z-[1000]' : '-z-10'}`}>

                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add a new address 📍</ModalHeader>

                            <ModalBody className="flex flex-col items-center w-full justify-center">


                                <>
                                    <Input type='number' placeholder='enter your the number' value={number?.toString()} onChange={(e) => { setNumber(parseInt(e.target.value)) }} />
                                    <Input type='text' placeholder='enter your street' value={street} onChange={(e) => { setStreet(e.target.value) }} />
                                    <Input type='number' placeholder='enter your postal code' value={postalCode?.toString()} onChange={(e) => { setPostalCode(parseInt(e.target.value)) }} />
                                    <Input type='city' placeholder='enter your city' value={city} onChange={(e) => { setCity(e.target.value) }} />
                                </>

                            </ModalBody>
                            <ModalFooter className="w-full flex items-center justify-between">
                                <Button color="danger" variant="light" onPress={onClose} className="">
                                    Close
                                </Button>
                                <Button onClick={() => {
                                    createAddress(
                                        {
                                            number: number as number,
                                            street: street as string,
                                            postalCode: postalCode as number,
                                            city: city as string,
                                        })
                                }}>
                                    add a new address
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>


    )
}

export default CreateAddress