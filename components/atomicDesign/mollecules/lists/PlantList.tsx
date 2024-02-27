'use client'

import { Button, Card, CardBody, Image, Avatar, Badge, Link } from "@nextui-org/react"

type Props = {}

function PlantList({ }: Props) {

    const list = [
        {
            user: 'Nick',
            plant: 'Cocotier',
            latinName: 'Cocos nucifera',
            img: 'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Bebe',
            plant: 'Cocotier',
            latinName: 'Cocos nucifera',
            img: 'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg',
            description: 'Besoin aide pour mon cocotier de toute urgence le truc est en train de brûler littéralement là aled oskour'
        },
        {
            user: 'Olivia',
            plant: 'Cocotier',
            latinName: 'Cocos nucifera',
            img: 'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Patrick',
            plant: 'Cocotier',
            latinName: 'Cocos nucifera',
            img: 'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg',
            description: 'Besoin aide pour mon cocotier'
        },
        {
            user: 'Elise',
            plant: 'Cocotier',
            latinName: 'Cocos nucifera',
            img: 'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg',
            description: 'Besoin aide pour mon cocotier'
        }
    ]

    return(
        <>
            <div className="absolute top-5 left-5">
                <Button color='primary' as={Link} href='/'>Retour</Button>
            </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            {list.map((item, i) => (
                <>
                    <Card 
                    isPressable
                    isBlurred
                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                    shadow="sm"
                    key={i}>
                        <CardBody className="overflow-hidden">
                            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center w-80">
                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-semibold text-foreground/90">{item.plant}</h3>
                                            <p className="text-small text-foreground/80">{item.latinName}</p>
                                            <div className="mt-2 flex items-center gap-4">
                                                <Avatar src='' /><h1>{item.user}</h1>
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
                                alt={item.plant}
                                className="w-full object-cover h-[140px]"
                                src={item.img} />
                            </div>
                            <div className="flex flex-col mt-3 mr-2 gap-1">
                                {/** footer */}
                                <div className="flex justify-end">
                                <Badge color="primary" content={99} shape="circle">
                                    <Image 
                                    width='100%'
                                    src={'https://us.123rf.com/450wm/siamimages/siamimages1601/siamimages160103031/51141637-speech-bubble-design-symbole-ic%C3%B4ne-illustration.jpg'}
                                    className="w-10 object-cover h-[45px]" />
                                </Badge>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </>
            ))}
            </div>
        </>
    )
}

export default PlantList