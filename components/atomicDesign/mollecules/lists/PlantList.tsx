'use client'

import { Button, Card, CardBody, Image, Avatar, Badge, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

type Props = {}

interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
    image_url: string;
    ownerId: number;
    guardianId: number | null;
    addressId: number;
    createdAt: string;
    updatedAt: string;
    owner: {
        id: number;
        email: string;
        userName: string;
        password: string;
        imageSrc: string | null;
        createdAt: string;
        updatedAt: string;
    };
    comment: any[]; // Vous pouvez définir un type spécifique pour les commentaires si nécessaire
}

function PlantList({ }: Props) {

    const [plants, setPlants] = useState<Plant[]>()
    const [isGuarded, setIsGuarded] = useState(false)

    const params = useParams()

    const router = useRouter()

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addguadian = async (plants: Plant[],) => {

        const token = localStorage.getItem('token')

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        plants.forEach(async item => {
            try {
                const url = `http://localhost:8080/api/plant/${item.id}/addguardian`

                const response = await fetch(url, {
                    method: 'PUT',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Erreur lors de l'ajout d'un gardien pour la plante ${item.id}`);
                }

                const data = await response.json();
                return data;

            } catch (error) {
                console.error(error);
                throw new Error(`Erreur lors de l'ajout d'un gardien pour la plante ${item.id}`);
            }
        });

    }

    const removeGuadian = async (plants: Plant[],) => {

        const token = localStorage.getItem('token')

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        plants.forEach(async item => {
            try {
                const url = `http://localhost:8080/api/plant/${item.id}/removeGuardian`

                const response = await fetch(url, {
                    method: 'PUT',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Erreur lors de l'ajout d'un gardien pour la plante ${item.id}`);
                }

                const data = await response.json();
                return data;

            } catch (error) {
                console.error(error);
                throw new Error(`Erreur lors de l'ajout d'un gardien pour la plante ${item.id}`);
            }
        });

    }


    useEffect(() => {

        const token = localStorage.getItem('token')

        const decodedQueryString = decodeURIComponent(params.list_id as string);

        const paramsToGet = decodedQueryString.split("&");

        const queryParams: any = {};

        paramsToGet.forEach(param => {
            const [key, value] = param.split("=");
            queryParams[key] = parseInt(value);
        });

        const userId = queryParams["userId"];
        const addressId = queryParams["addressId"];


        const fetchPlants = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const url = `http://localhost:8080/api/plant/${userId}/${addressId}`

                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                });
                if (!response.ok) {
                    console.log(response)
                    if (response.status === 403) {
                        localStorage.removeItem('token')
                        router.push("/connection")
                    }
                    throw new Error("Erreur lors de la récupération des données des plantes");
                }
                const data = await response.json();

                setPlants(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlants();
    }, [params.list_id, router, onOpenChange]);



    useEffect(() => {

        plants && setIsGuarded(!!plants[0].guardianId)

    }, [plants])



    return (
        <>
            <div className=" w-full flex items-center justify-evenly fixed top-0 left-0 z-50 gap-4 bg-white/30 backdrop-blur-xl py-4 ">
                <div className="">
                    <Button color='primary' as={Link} href='/'>Retour</Button>
                </div>
                {plants && <>
                    <div className="">
                        <h2 className="font-bold text-2xl"><span className="text-sm">Plante de :</span> {plants[0].owner.userName ? plants[0].owner.userName : plants[0].owner.email}</h2>
                    </div>
                    <div>
                        <Button className="capitalize" color={isGuarded ? "danger" : "success"} onClick={() => { onOpen() }}>{isGuarded ? "deliver" : "guard"}</Button>
                    </div>
                    <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange} className={`max-h-[80%] overflow-y-auto ${isOpen ? 'z-[1000]' : '-z-10'}`}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">{isGuarded ? "Deliver" : "Guard"} plants 🌱</ModalHeader>

                                    <ModalBody className="flex flex-col items-center w-full justify-center">

                                        <p>you are about to {isGuarded ? "deliver" : "guard"} those plants, do you confirm ?</p>

                                    </ModalBody>
                                    <ModalFooter className="w-full flex items-center justify-between">
                                        <Button color="danger" variant="light" onPress={onClose} className="">
                                            Close
                                        </Button>
                                        {isGuarded ?
                                            <Button color="primary" onClick={() => { removeGuadian(plants), onClose() }}>
                                                Deliver
                                            </Button>
                                            :
                                            <Button color="primary" onClick={() => { addguadian(plants), onClose() }}>
                                                Guard
                                            </Button>
                                        }

                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
                }
            </div>


            {plants && (
                <div className="gap-4 grid grid-cols-1 mt-24 sm:grid-cols-2">
                    {plants.map((item) => (
                        <>

                            <Card
                                isPressable
                                isBlurred
                                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                shadow="sm"
                                as={Link}
                                href={`/plant/userId=${item.ownerId}&addressId=${item.addressId}/${item.id}`}
                                key={item.id}>
                                <CardBody className="overflow-hidden">
                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center w-80">
                                        <div className="flex flex-col col-span-6 md:col-span-8">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="font-semibold text-foreground/90">{item.common_name}</h3>
                                                    <p className="text-small text-foreground/80">{item.scientific_name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={item.common_name}
                                            className="w-full object-cover h-[140px]"
                                            src={item.image_url || "https://cdn.pixabay.com/photo/2024/01/04/09/34/plant-8486960_960_720.png"} />
                                    </div>
                                    <div className="flex flex-col mt-3 mr-2 gap-1">
                                        {/** footer */}
                                        <div className="flex justify-end">
                                            <Badge color="primary" content={item.comment.length} shape="circle">
                                                <Image
                                                    width='100%'
                                                    src={'https://us.123rf.com/450wm/siamimages/siamimages1601/siamimages160103031/51141637-speech-bubble-design-symbole-ic%C3%B4ne-illustration.jpg'}
                                                    alt=""
                                                    className="w-10 object-cover h-[45px]" />
                                            </Badge>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </>
                    ))}
                </div>

            )}

        </>
    )
}

export default PlantList