'use client'

import { Avatar, Button, Card, CardBody, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useState } from 'react'

type Props = {}

function Profile_ID_page({ }: Props) {

  const [editName, setEditName] = useState(false)
  const [nameValue, setNameValue] = useState('Jhon Doe')

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8 relative'>
      <section className='absolute top-2 left-2'>
        <Button isIconOnly as={Link} href='/'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Button>
      </section>
      <section>
        <Avatar src={``} name={`jhon Doe`} size="lg" className='scale-150' />
      </section>
      <section className='mt-10 w-full flex flex-col items-center justify-center gap-4'>
        <div className='flex items-center gap-2'>
          {editName ?
            <div className='flex items-center gap-2'>
              <Button isIconOnly color='danger' onPress={() => { setEditName(false) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              </Button>
              <Button isIconOnly color='success'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              </Button>
            </div>
            :
            <>
              <Button isIconOnly onPress={() => { setEditName(true) }}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">

                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </Button>
            </>
          }
          <Input color='primary' fullWidth isDisabled={!editName} type="text" label={'name'} value={nameValue} onChange={(e) => setNameValue(e.target.value)} />

        </div>

        <Divider className="my-4" />

        <div className='flex items-center gap-2'>
          <Button isIconOnly color='danger' onPress={onOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
          <Input color='primary' fullWidth isDisabled type="text" label={`1020 Bis chemin de la montagne 38690 le Grand Lemps`} />
          <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>{(onClose) => (<>
              <ModalHeader>Delet this address ?</ModalHeader>
              <ModalBody>
                {`1020 bis chemin de la montagne 38690 le Grand Lemps`}
              </ModalBody>
              <ModalFooter className="w-full flex items-center justify-between">
                <Button color="danger" variant="light" onPress={onClose} className="">
                  Close
                </Button>
                <Button color="primary" onClick={() => { console.log('post action ') }}>
                  Delet my address
                </Button>
              </ModalFooter>
            </>)}
            </ModalContent>

          </Modal>
        </div>
        <Button fullWidth color='primary'>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
          Add new address
        </Button>

        <Divider className="my-4" />
        <h3>plant i own</h3>
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
                    <h1 className="text-large font-medium mt-2 flex items-center gap-4">Guardian :  Jane Doe <Avatar src='' /></h1>
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
        <Divider className="my-4" />
        <h3>plant i guard</h3>
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
                    <h1 className="text-large font-medium mt-2 flex items-center gap-4">Guardian :  Jane Doe <Avatar src='' /></h1>
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