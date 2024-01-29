'use client'

import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react"

type Props = {}

function PlantList({ }: Props) {

    const list = [
        {
            user: 'Thomas',
            plant: 'Cocotier',
            img: '/res/cocotier.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Antoine',
            plant: 'Cocotier',
            img: '/res/cocotier.jpg',
            description: 'Besoin aide pour mon cocotier de toute urgence le truc est en train de brûler littéralement là aled oskour'
        },
        {
            user: 'Olivier',
            plant: 'Cocotier',
            img: '/res/cocotier.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Delphine',
            plant: 'Cocotier',
            img: '/res/cocotier.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Elise',
            plant: 'Cocotier',
            img: '/res/cocotier.jpg',
            description: 'Besoin aide pour mon cocotier'
        }
    ]

    return(
        <>
            <div className="absolute top-5 left-5">
                <Button color='primary'>Retour</Button>
            </div>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, i) => (
                <>
                    <Card shadow="sm" key={i} isPressable>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={item.plant}
                                className="w-full object-cover h-[140px]"
                                src={item.img} />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.plant}</b>
                        </CardFooter>
                    </Card>
                    <div className="relative w-80">
                        <div className="absolute bottom-0">
                            <h1 key={i}><b>{item.user}</b></h1>
                            <p key={i}>{item.description}</p>
                        </div>
                    </div>
                </>
            ))}
            </div>
        </>
    )
}

export default PlantList