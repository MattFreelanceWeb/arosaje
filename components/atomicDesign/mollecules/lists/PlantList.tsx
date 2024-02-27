'use client'

import { Button, Card, CardBody, Image, Avatar, Badge, Link } from "@nextui-org/react"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {}

function PlantList({ }: Props) {

    const [plants, setPlants] = useState<any[]>()

    const params = useParams()

    useEffect(() => {

        const decodedQueryString = decodeURIComponent(params.list_id as string); // Décoder la chaîne de requête

        // Séparer les paramètres
        const paramsToGet = decodedQueryString.split("&");

        // Initialiser un objet pour stocker les paramètres
        const queryParams: any = {};

        // Boucler à travers les paramètres et les stocker dans l'objet queryParams
        paramsToGet.forEach(param => {
            const [key, value] = param.split("=");
            queryParams[key] = parseInt(value); // Convertir la valeur en nombre si nécessaire
        });

        // Maintenant, vous pouvez accéder aux valeurs de userId et addressId comme ceci :
        const userId = queryParams["userId"]; // 3
        const addressId = queryParams["addressId"]; // 1

        // const fetchPlants = async () => {

        //     //TODO: remplacer le token pour l'obtenir de manière dynamique

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOjIsImlhdCI6MTcwOTA0MTM4NiwiZXhwIjoxNzA5MDQ0OTg2fQ.FRwWnuLMYGeeotdbTlbpwLtOe-X-6MaR-BtsU_RmIS8";

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
                    throw new Error("Erreur lors de la récupération des données des plantes");
                }
                const data = await response.json();

                //log for dev mode
                console.log(data.data)

                setPlants(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlants();
    }, [params.list_id]);


    return (
        <>
            <div className="absolute top-5 left-5">
                <Button color='primary' as={Link} href='/'>Retour</Button>
            </div>
            {plants && (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
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
                                                    <div className="mt-2 flex items-center gap-4">
                                                        <Avatar src='' /><h1>{item.owner.email}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={item.image_url}
                                            className="w-full object-cover h-[140px]"
                                            src={item.img} />
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