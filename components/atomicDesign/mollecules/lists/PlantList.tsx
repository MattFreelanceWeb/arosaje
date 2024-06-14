'use client'

import { Button, Card, CardBody, Image, Avatar, Badge, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation";
import { PlantForList } from "@/utils/interfaces"
import { useFetchPlants } from "@/utils/customHooks";

import { useEffect, useState } from "react";

type Props = {}

function PlantList({ }: Props) {


    const plants = useFetchPlants()
    const [isGuarded, setIsGuarded] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const addguadian = async (plants: PlantForList[],) => {

        const token = localStorage.getItem('token')

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        plants.forEach(async item => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/plant/${item.id}/addguardian`

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

    const removeGuadian = async (plants: PlantForList[],) => {

        const token = localStorage.getItem('token')

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        plants.forEach(async item => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/plant/${item.id}/removeGuardian`

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
                        <h2 className="font-bold text-2xl"><span className="text-sm">Plante(s) de :</span> {plants[0].owner.userName ? plants[0].owner.userName : plants[0].owner.email}</h2>
                    </div>

                </>
                }
            </div>


            {plants && (
                <div className="w-full gap-4 grid grid-cols-2 sm:grid-cols-2 py-40">
                    {plants.map((item) => (
                        <>

                            <Card
                                isPressable
                                isBlurred
                                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] "
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

            {plants && <div className="">
                <div className="fixed left-0 bottom-0 flex items-center justify-center w-full p-12  bg-white/30 backdrop-blur-xl ">
                    <Button fullWidth className="max-w-2xl" color={isGuarded ? "danger" : "success"} onClick={() => { onOpen() }}>{isGuarded ? "Ne plus garder" : "Garder"}</Button>
                </div>
                <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange} className={`max-h-[80%] overflow-y-auto ${isOpen ? 'z-[1000]' : '-z-10'}`}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{isGuarded ? "Ne plus garder" : "Garder"} les plantes 🌱</ModalHeader>

                                <ModalBody className="flex flex-col items-center w-full justify-center">

                                    <p>Vous {isGuarded ? "n'allez plus garder" : "allez garder"} ces plantes, confirmer ?</p>

                                </ModalBody>
                                <ModalFooter className="w-full flex items-center justify-between">
                                    <Button color="danger" variant="light" onPress={onClose} className="">
                                        Fermer
                                    </Button>
                                    {isGuarded ?
                                        <Button color="primary" onClick={() => { removeGuadian(plants), onClose() }}>
                                            Ne plus garder
                                        </Button>
                                        :
                                        <Button color="primary" onClick={() => { addguadian(plants), onClose() }}>
                                            Garder
                                        </Button>
                                    }

                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>}

        </>
    )
}

export default PlantList