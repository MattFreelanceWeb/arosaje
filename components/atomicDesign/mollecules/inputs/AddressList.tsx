'user client'

import { Button } from '@nextui-org/button'
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import CreateAddress from './CreateAddress'
const jwt = require("jsonwebtoken")


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

type Props = { addressArray: Address[], toggleAddressList: boolean, setToggleAddressList: Function }

function AddressList({ addressArray, toggleAddressList, setToggleAddressList }: Props) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [error, setError] = useState()

    const handleDeleteAddress = async (addressId: number) => {
        try {
            const token = localStorage.getItem("token")

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const response = await fetch(`http://localhost:8080/api/address/${addressId}`, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error('Failed to delete address');
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {addressArray.map((item) => (
                <div key={item.id} className='flex items-center gap-2 w-full'>
                    <Button isIconOnly color='danger' onPress={onOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                    <Input color='primary' fullWidth isDisabled type="text" label={`${item.number} ${item.street} ${item.postalCode}  ${item.city}`} />
                    <Modal placement={"center"} isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>{(onClose) => (<>
                            <ModalHeader>Delet this address ?</ModalHeader>
                            <ModalBody>
                                {`${item.number} ${item.street} ${item.postalCode}  ${item.city}`}
                            </ModalBody>
                            <ModalFooter className="w-full flex items-center justify-between">
                                <Button color="danger" variant="light" onPress={onClose} className="">
                                    Close
                                </Button>
                                <Button color="primary" onClick={() => { handleDeleteAddress(item.id), setToggleAddressList(!toggleAddressList), onClose() }}>
                                    Delet my address
                                </Button>
                            </ModalFooter>
                        </>)}
                        </ModalContent>

                    </Modal>
                </div>

            ))}
        </>
    )
}

export default AddressList