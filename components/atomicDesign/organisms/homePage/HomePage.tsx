'use client'

import { Button, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import Profile from "../../mollecules/badge/Profile"
import PlantInput from "../../mollecules/inputs/PlantInput"
import DaySelect from "../../mollecules/select/DaySelect"
import AddressSelect from "../../mollecules/select/AddressSelect"
import PhotoInput from "../../mollecules/inputs/PhotoInput"
const jwt = require("jsonwebtoken")



export default function HomePage() {

  // todo: export interface in a separate file with export

  interface User {
    userId: number;
    userName: string;
    email: string;
    address: Address[];
    plantsOwned: Plant[];
    plantsGuarded: Plant[];
  }

  interface Address {
    id: number;
    number: number;
    street: string;
    postalCode: number;
    city: string;
    country: string;
    lat: number;
    lng: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
  }

  interface Plant {
    common_name: string;
    scientific_name: string;
    image_url: string;
  }

  interface PlantData {
    common_name?: string;
    scientific_name?: string;
    image_url?: string;
    addressId?: number;
  }

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


  const [daySlected, setDaySlected] = useState()
  const [plantSelected, setPlantSelected] = useState<Plant>()
  const [addressSelected, setAddressSelected] = useState<Address>()
  const [user, setUser] = useState<User>()
  const [isPlantLoading, setIsPlantLoading] = useState(false)

  const createPlant = async (plantData: PlantData) => {
    setIsPlantLoading(true)
    try {
      const token = localStorage.getItem("token")
      const decodedToken = await jwt.decode(token, { complete: true });

      const userId = await decodedToken.payload.userId

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://localhost:8080/api/plant/users/${userId}/plants`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(plantData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la plante');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Une erreur est survenue lors de la création de la plante');
    } finally{
      setIsPlantLoading(false)
    }
  };



  useEffect(() => {


    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token")
        const decodedToken = await jwt.decode(token, { complete: true });

        const userId = await decodedToken.payload.userId

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const url = `http://localhost:8080/api/user/${userId}`

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
        console.log(data)

        setUser({ ...data, id: userId });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser()

  }, [])

  const Map = useMemo(() => dynamic(
    () => import('@/components/atomicDesign/mollecules/map/Map'),
    {
      loading: () => <CircularProgress aria-label="Loading..." size="lg" />,
      ssr: false
    }
  ), [])

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {user && (
        <>
          {/** composant badge profil */}
          <Profile imgSrc={''} userName={user?.email} userId={user?.userId} />
        </>
      )}


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
                  {isPlantLoading ? <Spinner />
                    :
                    <>
                      <PlantInput setPlantSelected={setPlantSelected} />

                      {/** select a day  */}
                      {/* <DaySelect setDaySelected={setDaySlected} /> */}

                      {/** select an adress  */}
                      <AddressSelect setAddressSelected={setAddressSelected} addresses={user?.address} />
                      {/**component to take a picture or add a file and have a direct view on it */}
                      {/* <div>
                        <PhotoInput/>
                      </div> */}
                    </>}

                </ModalBody>
                <ModalFooter className="w-full flex items-center justify-between">
                  <Button color="danger" variant="light" onPress={onClose} className="">
                    Close
                  </Button>
                  <Button isDisabled={!(!!plantSelected && !!addressSelected)} color="primary" onClick={() => { createPlant({ common_name: plantSelected?.common_name, scientific_name: plantSelected?.scientific_name, image_url: plantSelected?.image_url, addressId: addressSelected?.id }) }}>
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