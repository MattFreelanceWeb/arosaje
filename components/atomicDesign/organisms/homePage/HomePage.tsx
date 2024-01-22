'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import Profile from "../../mollecules/badge/Profile"
import PlantInput from "../../mollecules/inputs/PlantInput"
import DaySelect from "../../mollecules/select/DaySelect"
import AddressSelect from "../../mollecules/select/AddressSelect"



export default function HomePage() {

  // const [latitude, setLatitude] = useState<number>(0)
  // const [longitude, setLongitude] = useState<number>(0)

  // const [adressSelected, setAdressSelected] = useState<[latitude: number, longitude: number]>()

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

  const user = {
    id:'uuid',
    isBotanist:false,
    email:'jhonDoe@gmail.com ',
    name: 'jhonDoe',
    imageSrc:'https://mon_image_de_profil',
    adress: [
      {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' },
      {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' },
      {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' }
    ],
    plantOwned:[
      {id:'uuid',common_name:'rose',scientific_name:'resea ',image_url:'https://source_de_l_image',adress:'adress de garde de plante', owner:'uuid_owner',guardian:'uuid_guardian'}
    ],
    plantGuarded:[
      {id:'uuid',common_name:'rose',scientific_name:'resea ',image_url:'https://source_de_l_image',adress:'adress de garde de plante',owner:'uuid_owner',guardian:'uuid_guardian'}
    ],
  }


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

  return (
    <>
      {/** composant badge profil */}
      <Profile imgSrc={''} userName={''} userId={'testuser'} />

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
                  <PlantInput />
                  {/** select a day  */}
                  <DaySelect />
                  {/** select an adress  */}
                  <AddressSelect />
                  {/**component to take a picture or add a file and have a direct view on it */}
                  <div>
                    {/* <PhotoInput/> */}
                  </div>
                </ModalBody>
                <ModalFooter className="w-full flex items-center justify-between">
                  <Button color="danger" variant="light" onPress={onClose} className="">
                    Close
                  </Button>
                  <Button color="primary" onClick={() => { console.log('post action ') }}>
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
    </>
  )
}
