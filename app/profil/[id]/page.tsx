'use client'

import AddressList from '@/components/atomicDesign/mollecules/inputs/AddressList'
import CreateAddress from '@/components/atomicDesign/mollecules/inputs/CreateAddress'
import ListPlant from '@/components/atomicDesign/mollecules/lists/ListPlant'
import ListPlantOwned from '@/components/atomicDesign/mollecules/lists/ListPlant'
import { Avatar, Button, Card, CardBody, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { User} from "@/utils/interfaces"
const jwt = require("jsonwebtoken")

import React, { useEffect, useState } from 'react'
import { useFetchPlants, useFetchUserFromToken, useFetchUserFromUrl } from '@/utils/customHooks'

type Props = {}

function Profile_ID_page({ }: Props) {

  const [editName, setEditName] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [toggleAddressList, setToggleAddressList] = useState(false)
  const user = useFetchUserFromUrl()


  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-8 relative '>
      {user ?
        <>

          <Image className='absolute top-0 left-0 object-cover w-full h-full' src={'https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512_960_720.jpg'} alt='' width={1280} height={847} />
          <section className='absolute top-2 left-2'>
            <Button isIconOnly as={Link} href='/'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </Button>
          </section>
          <section>
            <Avatar src={``} name={user.email} size="lg" className='scale-150' />

          </section>
          <section className='mt-10 w-full flex flex-col items-center justify-center gap-4 max-w-96 bg-white/30 backdrop-blur-xl border-2 rounded-md p-4'>
            <div className='flex items-center gap-2 w-full'>
            <h2>Name</h2>
            <Input color='primary' fullWidth isDisabled={!editName} type="text" value={user.userName ? user.userName : nameValue} onChange={(e) => setNameValue(e.target.value)} />
              {editName ?
                <div className='flex items-center gap-2'>
                  <Button isIconOnly color='success' onPress={() => { setEditName(false) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
            </div>

            <Divider className="my-4" />

            <AddressList addressArray={user.address}  toggleAddressList={toggleAddressList} setToggleAddressList={setToggleAddressList}/>

            <CreateAddress />

            <Divider className="my-4" />
            <h3 className='font-bold text-xl capitalize'>🏡 plant i own</h3>

            <ListPlant plantOwned={user.plantsOwned} />


            <Divider className="my-4" />
            <h3 className='font-bold text-xl capitalize'> 🍀 plant i guard</h3>
            <ListPlant plantOwned={user.plantsGuarded} />

          </section>
        </>
        :
        <Spinner />}
    </main>
  )
}

export default Profile_ID_page