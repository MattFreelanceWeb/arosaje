'use client'

import React, { useState } from 'react'
import { Image, Button, Link, Badge, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider, Input } from '@nextui-org/react'

type Props = {}

function Plant_id_page({}: Props) {
	
		const [modal1Open, setModal1Open] = useState(false);
		const [modal2Open, setModal2Open] = useState(false);
	  
		const openModal = (modalNumber: number) => {
		  switch (modalNumber) {
			case 1:
			  setModal1Open(true);
			  break;
			case 2:
			  setModal2Open(true);
			  break;
	  
			default:
			  break;
		  }
		};
	  
		const closeAllModals = () => {
		  setModal1Open(false);
		  setModal2Open(false);
		};

	return (
		<main className='flex min-h-screen flex-col items-center p-4'>
			<div className="absolute top-5 left-5">
				<Button color='primary' as={Link} href='/'>Retour</Button>
			</div>
			<div className='absolute top-32 gap-4 grid grid-cols-1 sm:grid-cols-2 sm:top-16'>
				<Image 
				className='w-72 h-72 sm:w-80 sm:h-full'
				src={'https://cdn.pixabay.com/photo/2014/05/23/00/16/hammock-351606_1280.jpg'}
				alt=''
				width='100%'/>
				<section className='w-full h-72 gap-4 sm:w-full sm:h-full bg-white/30 backdrop-blur-xl border-2 rounded-md'>
					<div className='absolute top-2 m-4'>
						<p className='text-sm sm:text-base text-center'>Le cocotier fait des cocos qui sont revendus au supermarché Coco</p>
					</div>
					<div className='flex absolute bottom-2 left-1'>
						<Button onClick={() => openModal(2)} className='bg-white h-[60px]'>
							<Image
							src={'https://static-00.iconduck.com/assets.00/question-mark-circle-outline-icon-512x512-vxeroxyp.png'} 
							width='100%'
							className='w-10 object-cover h-[40px]' />
						</Button>
						<h1></h1>
					</div>
					<div className='flex absolute bottom-1 right-3'>
						<Button onClick={() => openModal(1)} className='bg-white h-[60px]'>
							<Badge color="primary" content={99} shape="circle">
								<Image 
								width='100%'
								src={'https://us.123rf.com/450wm/siamimages/siamimages1601/siamimages160103031/51141637-speech-bubble-design-symbole-ic%C3%B4ne-illustration.jpg'}
								className="w-15 object-cover h-[45px]" />
							</Badge>
						</Button>
					</div>
				</section>
			</div>
			<div className='flex absolute bottom-16 items-center sm:bottom-4'>
				<a href='/profil/id'>
					<Avatar src='' />
				</a>
				<a href='/profil/id'>
					<h1 className='pl-2'>xX__DarkSasuke69__Xx</h1>
				</a>
			</div>
			<section>
				<Modal placement={"center"} isOpen={modal1Open} onClose={closeAllModals} className={`max-h-[80%] overflow-y-auto ${modal1Open ? 'z-[1000]' : '-z-10'}`}>
					<ModalContent>
						{(closeAllModals) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Commentaires
							</ModalHeader>
							<Divider></Divider>
							<ModalBody className="flex flex-col items-center w-full justify-center">
								{/*Fetch commentaires*/}
							</ModalBody>
							<ModalFooter className="w-full flex items-center">
								<Input type='text' label='Ajouter un commentaire...' />
								<Button className='justify-end' color="primary" onClick={() => { console.log('Commentaire publié') }}>
									Publier
								</Button>
							</ModalFooter>
						</>
						)}
					</ModalContent>
				</Modal>
			</section>
			<section>
				<Modal placement={"center"} isOpen={modal2Open} onClose={closeAllModals} className={`max-h-[80%] overflow-y-auto ${modal2Open ? 'z-[1000]' : '-z-10'}`}>
					<ModalContent>
						{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Effectuer une demande
							</ModalHeader>
							<Divider></Divider>
							<ModalBody className="flex flex-col items-center w-full justify-center">
								<Input type='text' label='Précisez votre demande...' />
							</ModalBody>
							<ModalFooter className="w-full flex items-center justify-center">
								<Button color="primary" onClick={() => { console.log('Commentaire publié') }}>
									Envoyer
								</Button>
							</ModalFooter>
						</>
						)}
					</ModalContent>
				</Modal>
			</section>
		</main>
	)
}

export default Plant_id_page