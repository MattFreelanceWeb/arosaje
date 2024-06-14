import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

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


type Props = { setAddressSelected: Function, addresses: Address[] | undefined }

function AddressSelect({ setAddressSelected, addresses }: Props) {

  const [stringAdress, setstringAdress] = useState('')
  //setstringAdress(Object.values(addresses[parseInt(e.target.value)]).join(" ").replace(/ /g, "+"))

  // const addresses = [
  //     {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' },
  //     {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' },
  //    {id:'uuid', number: '1020', street: 'chemin de la montagne', postCode: '38690', city: 'le grand lemps', lat: '' , lng: '' }
  //   ]


  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      {addresses && <>
        <Select
          label="Sélectionner une adresse"
          className=""
          onChange={(e) => setAddressSelected(addresses[parseInt(e.target.value)])}
        >
          {addresses.map((address, i) => (
            <SelectItem key={i} value={address.number + "+" + address.street + "+" + address.postalCode + "+" + address.city}>
              {address.number + " " + address.street + " " + address.postalCode + " " + address.city}
            </SelectItem>
          ))}
        </Select>
      </>}

    </div>
  )
}

export default AddressSelect