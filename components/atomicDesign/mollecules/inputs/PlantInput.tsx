
import { Autocomplete, AutocompleteItem, Avatar, CircularProgress, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

type Props = {}



function PlantInput({ }: Props) {

    type PlantObject = {
        common_name: string,
        id: number,
        image_url: string,
        scientific_name: string
    }

    let uuid = self.crypto.randomUUID();

    const [plantQuery, setPlantQuery] = useState('')
    const [plantArray, setPlantArray] = useState<PlantObject[]>([])
    const [value] = useDebounce(plantQuery, 500)
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {

        const fetchFromTrefle = async (query: string) => {
            setIsloading(true)

            const url = `http://localhost:3000/api/fetch/trefle?query=${value}`

            try {
                const apiData = await fetch(url)
                const data = await apiData.json()
                if (data) {
                    setPlantArray(data.plant)
                } else {
                    setPlantArray([])
                }


            }
            catch (error) {
                console.log(error)
            }

            setIsloading(false)
        }

        if (!!value) {
            fetchFromTrefle(value)
        }

    }, [value])

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4" >
            <Autocomplete
                label="Select a plant"
                className=""
                fullWidth
                onInputChange={(e)=>setPlantQuery(e)}
                variant="bordered"
                placeholder="Select a plant"
                labelPlacement="inside"

            >
               
                {plantArray.map((item,i )=> (<AutocompleteItem onPress={()=> console.log(item)} key={item.common_name} textValue={item.common_name}>{ isloading ? <CircularProgress aria-label="Loading..." /> : 
                          <div className="flex gap-2 items-center">
                          <Avatar alt={''} className="flex-shrink-0" size="sm" src={item.image_url} />
                          <div className="flex flex-col">
                            <span className="text-small">{item.common_name}</span>
                            <span className="text-tiny text-default-400">{item.scientific_name}</span>
                          </div>
                        </div>
                }</AutocompleteItem>))}

            </Autocomplete>
        </div >
    )
}

export default PlantInput