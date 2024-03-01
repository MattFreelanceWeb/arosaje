import { Badge, Card, CardBody, Image, Link } from '@nextui-org/react'
import React from 'react'

type Props = { plantOwned: any[] }

function ListPlant({ plantOwned }: Props) {

    return (
        <>
            {plantOwned.length>0 ? plantOwned.map((item) => (
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
                            {item.comment &&
                                <div className="flex justify-end">
                                    <Badge color="primary" content={item.comment.length} shape="circle">
                                        <Image
                                            width='100%'
                                            src={'https://us.123rf.com/450wm/siamimages/siamimages1601/siamimages160103031/51141637-speech-bubble-design-symbole-ic%C3%B4ne-illustration.jpg'}
                                            alt=""
                                            className="w-10 object-cover h-[45px]" />
                                    </Badge>
                                </div>}
                        </div>
                    </CardBody>
                </Card>

            )):
            <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm">
            <CardBody className="overflow-hidden">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center w-80">
                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-semibold text-foreground/90">no plant here</h3>
                                <p className="text-small text-foreground/80"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={""}
                        className="w-full object-cover h-[140px]"
                        src={ "https://cdn.pixabay.com/photo/2024/01/04/09/34/plant-8486960_960_720.png"} />
                </div>

            </CardBody>
        </Card>
            }
        </>
    )
}

export default ListPlant