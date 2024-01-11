'use client'

import PhotoInput from "@/components/atomicDesign/mollecules/inputs/PhotoInput"
import { Avatar, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"



export default function Home() {

  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)

  const [stringAdress, setstringAdress] = useState('')
  const [adressSelected, setAdressSelected] = useState<[latitude:number,longitude:number]>()

  // const fetchLatLngFromGvt = async (stringAdress:string) => {
  //   try {
  //     const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${stringAdress}`,{method: "GET"});
  //     const data = await reponse.json()
  //     const latLng = data.features[0].geometry.coordinates
  //     console.log(latLng)
  //     return latLng

  //   } catch (error : any) {
  //     console.error(`Erreur lors du téléchargement : ${error}`);
  //   }
  // }


  useEffect(() => {

    // route guard
    let isConnected: Boolean = false

    isConnected ? <> {console.log('you are connected')} </> : <> {console.log('you need to connect before landing here')} </>



  }, [])

  const Map = useMemo(() => dynamic(
    () => import('@/components/atomicDesign/mollecules/map/Map'),
    {
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const plants = ['rose', 'lila', 'avocatier',]

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

  const addresses = [
    { number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps' },
    { number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps' }, 
    { number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps' }
  ]


  return (
    <main className="relative min-h-screen flex items-center justify-center">

      {/** composant badge profil */}
      <section className="absolute top-4 right-4 z-[1000]">
        <Popover placement="right">
          <PopoverTrigger>
            <Avatar size="lg" name="Jhon Doe" src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col items-center gap-4 p-2">
              <Button as={Link} href={`/profil/userid`} className="bg-transparent">Mon profil</Button>
              <Button>Se déconnecter</Button>
            </div>
          </PopoverContent>
        </Popover>
      </section>
      {/** composant pour trigger le flow de post d'une plante */}
      <section className={`absolute w-full bottom-4 flex items-center justify-around z-[1000] `}>
        <Button size="lg" color="primary" className="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          Browse
        </Button>
        <Button onPress={onOpen} size="lg" color="primary" className="">Add a plant 🌱</Button>
      </section>
      <section>
        <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange} className={`max-h-[80%] overflow-y-auto ${isOpen ? 'z-[1000]' : '-z-10'}`}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add a plant 🌱</ModalHeader>
                <ModalBody className="flex flex-col items-center w-full justify-center">
                  {/** select plant */}
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                      label="Select a plant"
                      className=""
                    >
                      {plants.map((plant, i) => (
                        <SelectItem key={i} value={plant}>
                          {plant}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/** select a day  */}
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                      label="Select a day"
                      className=""
                      selectionMode="multiple"
                    >
                      {days.map((day, i) => (
                        <SelectItem key={i} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/** select an adress  */}
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Select
                      label="Select an adress"
                      className=""
                      onChange={(e)=> setstringAdress(Object.values(addresses[parseInt(e.target.value)]).join(" ").replace(/ /g, "+"))}
                    >
                      {addresses.map((address, i) => (
                        <SelectItem key={i} value={address.number +"+"+ address.street +"+"+ address.postCode +"+"+ address.city}>
                          { address.number + " " + address.street + " " + address.postCode + " " + address.city }
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/**component to take a picture or add a file and have a direct view on it */}
                  <div>
                    <PhotoInput/>
                  </div>


                </ModalBody>
                <ModalFooter className="w-full flex items-center justify-between">
                  <Button color="danger" variant="light" onPress={onClose} className="">
                    Close
                  </Button>
                  <Button color="primary" onClick={()=>{ console.log('post action ')}}>
                    Post my plant
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>

      {/** composant map */}
      <Map />
    </main>
  )
}
