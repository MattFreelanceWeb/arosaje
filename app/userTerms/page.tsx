// pages/CGU.tsx
import React from 'react';
import Image from 'next/image';
import Logo from "@/res/logo.webp"


const CGU = () => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <Image
                src="https://cdn.pixabay.com/photo/2016/11/19/11/11/hands-1838658_960_720.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
            />
            <div className='absolute top-4 w-48 h-48 rounded-md z-10 md:right-14 top-0 w-60 h-60 rounded-md z-10 '>
                <Image src={Logo} alt='' />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
                <div className="bg-white rounded-md p-8 max-w-3xl overflow-auto max-h-full">
                    <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation (CGU)</h1>
                        <div>
                        <p><strong>Dernière mise à jour :</strong> [27/05/2024]</p>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Présentation du service</h2>
                        <p>Arosaje est une plateforme en ligne permettant aux utilisateurs de confier la garde de leurs plantes à d'autres utilisateurs, appelés "gardiens". Les gardiens prennent soin des plantes pendant une période définie en échange de services réciproques ou de rémunération.</p>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Inscription et Compte</h2>
                        <p>Pour utiliser Arosaje, vous devez créer un compte en fournissant une adresse email, un nom d'utilisateur, et un mot de passe. Vous vous engagez à fournir des informations exactes et à les maintenir à jour. Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités sur votre compte.</p>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Données Personnelles</h2>
                        <p>En utilisant notre service, vous consentez à la collecte et à l'utilisation de vos données personnelles conformément à notre Politique de Confidentialité. Les données que nous collectons incluent :</p>
                        <ul className="list-disc ml-6">
                            <li><strong>Adresse email</strong> : Utilisée pour la communication et la gestion du compte.</li>
                            <li><strong>Position géographique</strong> : Utilisée pour faciliter la mise en relation entre les utilisateurs et les gardiens proches.</li>
                            <li><strong>Noms d'utilisateurs</strong> : Utilisés pour identifier les utilisateurs sur la plateforme.</li>
                            <li><strong>Mots de passe</strong> : Stockés de manière sécurisée pour protéger l'accès à votre compte.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Utilisation du Service</h2>
                        <p>Vous acceptez d'utiliser Arosaje de manière responsable et légale. Vous vous engagez à :</p>
                        <ul className="list-disc ml-6">
                            <li>Ne pas utiliser la plateforme à des fins illégales ou non autorisées.</li>
                            <li>Respecter les droits des autres utilisateurs.</li>
                            <li>Ne pas transmettre de contenu diffamatoire, offensant ou indécent.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Responsabilités</h2>
                        <p>Arosaje agit en tant qu'intermédiaire entre les utilisateurs et les gardiens. Nous ne pouvons pas être tenus responsables des actions des utilisateurs ou des gardiens. Vous reconnaissez que :</p>
                        <ul className="list-disc ml-6">
                            <li>Vous utilisez le service à vos propres risques.</li>
                            <li>Vous êtes responsable de la sécurité et de l'état de vos plantes confiées à un gardien.</li>
                            <li>Vous devez communiquer clairement les besoins spécifiques de vos plantes au gardien.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Réclamations et Litiges</h2>
                        <p>En cas de litige entre utilisateurs, nous vous encourageons à résoudre le problème à l'amiable. Si une solution ne peut être trouvée, vous pouvez contacter notre support pour une médiation. Cependant, Arosaje ne garantit pas la résolution des conflits et ne peut être tenu responsable des litiges entre utilisateurs.</p>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Modifications des CGU</h2>
                        <p>Arosaje se réserve le droit de modifier ces CGU à tout moment. Les modifications seront publiées sur cette page et entreront en vigueur immédiatement. En continuant à utiliser le service après la publication des modifications, vous acceptez les nouvelles CGU.</p>
                        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact</h2>
                        <p>Pour toute question concernant ces CGU, veuillez nous contacter à l'adresse suivante : [arosaje.contact@gmail.com].</p>
                        <p className="mt-6">Merci d'utiliser Arosaje !</p>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default CGU;
