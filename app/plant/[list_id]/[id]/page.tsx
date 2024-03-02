'use client'

import React, { useEffect, useState } from 'react'
import { Image, Button, Link, Badge, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Divider, Input } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation';
import PhotoInput from '@/components/atomicDesign/mollecules/inputs/PhotoInput';
const jwt = require("jsonwebtoken")

type Props = {}

function Plant_id_page({ }: Props) {

	interface Plant {
		id: number;
		common_name: string;
		scientific_name: string;
		image_url: string;
		ownerId: number;
		guardianId: number | null;
		addressId: number;
		createdAt: string;
		updatedAt: string;
		comment: any[];
		owner: {
			id: number;
			email: string;
			userName: string | null;
			password: string;
			imageSrc: string | null;
			createdAt: string;
			updatedAt: string;
		};
	}

	const router = useRouter()

	const [modal1Open, setModal1Open] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);

	const [plants, setPlants] = useState<Plant>()
	const [comment, setComment] = useState<string>()
	const [askValue, setAskValue] = useState<string>()
	const [isCommentLoading, setIsCommentLoading] = useState(false)

	const [pictureToSend, setPictureToSend] = useState("")

	const params = useParams()

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

	const createComment = async (comment: { content: string, byteImage: string }) => {

		setIsCommentLoading(true)
		try {
			const token = localStorage.getItem("token")
			const decodedToken = await jwt.decode(token, { complete: true });

			const userId = await decodedToken.payload.userId

			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};

			const response = await fetch(`http://localhost:8080/api/comment/users/${userId}/plants/${plants?.id}/comments`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(comment),
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la création de la plante');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			throw new Error('Une erreur est survenue lors de la création de la plante');
		} finally {
			setIsCommentLoading(false)
		}
	}

	const deleteComment = async (commentId: number) => {
		setIsCommentLoading(true)
		try {
			const token = localStorage.getItem("token")
			const decodedToken = await jwt.decode(token, { complete: true });

			const userId = await decodedToken.payload.userId

			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};

			const response = await fetch(`http://localhost:8080/api/comment/${commentId}`, {
				method: 'DELETE',
				headers: headers,
				body: JSON.stringify(comment),
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la suppression du commentaire');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			throw new Error('Une erreur est survenue lors de la suppression du commentaire');
		} finally {
			setIsCommentLoading(false)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")

		const fetchPlants = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				};

				const url = `http://localhost:8080/api/plant/${params.id}`

				const response = await fetch(url, {
					method: "GET",
					headers: headers,
				});
				if (!response.ok) {
					console.log(response)
					if (response.status === 403) {
						localStorage.removeItem('token')
						router.push("/connection")
					}
					throw new Error("Erreur lors de la récupération des données des plantes");
				}
				const data = await response.json();

				//log for dev mode
				console.log(data.data)

				setPlants(data.data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPlants();
	}, [params.id, router, isCommentLoading])


	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-4'>
			<div className="absolute top-5 left-5">
				<Button color='primary' as={Link} href={`/plant/userId=${plants?.ownerId}&addressId=${plants?.addressId}`}>Retour</Button>
			</div>

			<div className='absolute top-32 gap-4 grid grid-cols-1 sm:grid-cols-2 sm:top-16'>
				<Image
					className='w-72 h-72 sm:w-80 sm:h-full object-cover'
					src={plants?.image_url}
					alt=''
					width='100%'
				/>
				<section className='w-full h-72 gap-4 sm:w-full sm:h-full bg-white/30 backdrop-blur-xl border-2 rounded-md overflow-y-auto relative'>
					<div className='absolute top-2 w-full px-4 flex flex-col gap-4'>
						{plants && plants?.comment?.length > 0 ? plants?.comment.map((item, i) => (
							<div key={item.id}
								className={`text-sm sm:text-base text-center w-full flex items-center justify-center gap-4 rounded-md  text-white p-2 relative ${item.User.id === plants.ownerId ? "bg-green-500" : "bg-black"}`}>
								<div className='w-1/2 h-full'>
									<Image src={item.byteImage} alt='' />
								</div>
								<div className='w-1/2 h-full flex flex-col text-start'>
									<h2> de:{item.User.userName ? item.User.userName : item.User.email}</h2>
									<p className=' '>{item.content}</p>
									<p>
										time: {item.createdAt}
									</p>
								</div>
								<button className='absolute top-2 right-2 text-xs w-5 h-5 p-2 flex items-center justify-center border-2 rounded-full' onClick={() => deleteComment(item.id)}>
									<span className='-translate-y-[1px]'>x</span>
								</button>

							</div>))
							:
							<div className='text-sm sm:text-base text-center w-full h-12 flex items-center justify-center rounded-md'>
								no comment here
							</div>}
					</div>


				</section>
				{/**not yet implemented */}
				<div className=' absolute bottom-2 left-1 z-10'>
					<Button onClick={() => openModal(2)} className='bg-white h-[60px]'>
						<Image
							src={'https://static-00.iconduck.com/assets.00/question-mark-circle-outline-icon-512x512-vxeroxyp.png'}

							alt=''
							width='100%'
							className='w-10 object-cover h-[40px]' />
					</Button>
					<h1></h1>
				</div>
				<div className=' absolute bottom-1 right-3'>
					<Button onClick={() => openModal(1)} className='bg-white h-[60px]'>
						<Badge color="primary" content={plants?.comment.length} shape="circle">
							<Image
								width='100%'
								src={'https://us.123rf.com/450wm/siamimages/siamimages1601/siamimages160103031/51141637-speech-bubble-design-symbole-ic%C3%B4ne-illustration.jpg'}
								alt=''
								className="w-15 object-cover h-[45px]" />
						</Badge>
					</Button>
				</div>
			</div>

			<Link href='/profil/id' className='flex absolute bottom-16 items-center sm:bottom-4'>
				<Avatar src='' />
				<h1 className='pl-2'>{plants?.owner.email}</h1>
			</Link>

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

								</ModalBody>
								<ModalFooter className="w-full flex flex-col items-center gap-4">
									<PhotoInput pictureToSend={pictureToSend} setPictureToSend={setPictureToSend} />
									<Input type='text' label='Ajouter un commentaire...' value={comment} onChange={(e) => { setComment(e.target.value) }} />
									<Button className='justify-end' color="primary" onClick={() => { createComment({ content: comment as string, byteImage: pictureToSend }), setModal1Open(false), setComment("") }}>
										{/* .replace(/^data:image\/jpeg;base64,/, "") */}
										Publier
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</section>
			{/**  ask to a botanist section  -- not yet implemented*/}
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
									<Input type='text' label='Précisez votre demande...' value={askValue} onChange={(e) => setAskValue(e.target.value)} />
								</ModalBody>
								<ModalFooter className="w-full flex items-center justify-center">
									<Button color="primary" onClick={() => { console.log(`function to ask a botanist with an email with the request ${askValue}`), onClose() }}>
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