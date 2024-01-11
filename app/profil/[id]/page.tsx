import { Avatar, Button, Card, CardBody, Chip, Divider, Input } from '@nextui-org/react'
import Image from 'next/image'

import React from 'react'

type Props = {}

function Profile_ID_page({}: Props) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8 '>
        <section>
            <Avatar src={``} name={`jhon Doe`} size="lg" className='scale-150'/>
        </section>
        <section className='mt-10 w-full flex flex-col items-center justify-center gap-4'>
            <Input color='primary' fullWidth isDisabled  type="text" label={`name`}/>
            <Input color='primary' fullWidth isDisabled type="text" label={` Bio `}/>
            <Divider className="my-4" />
            <Input color='primary' fullWidth isDisabled type="text" label={`Adress`}/>
            <Divider className="my-4" />
            <Card
            isPressable
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >

      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              src="https://cdn.pixabay.com/photo/2018/06/28/17/02/water-lily-3504363_1280.jpg"
              width={200}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">Lotus</h3>
                <p className="text-small text-foreground/80">nom latin de la fleur</p>
                <h1 className="text-large font-medium mt-2 flex items-center gap-4">Guardian :  Jane Doe <Avatar src=''/></h1>
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-1">
                {/** footer */}
              <div className="flex justify-between">
                <p>number of comment : </p>
                <Chip color='danger'>{`99`}</Chip>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    
        </section>
        
    </main>
  )
}

export default Profile_ID_page