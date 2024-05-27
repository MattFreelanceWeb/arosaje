'use client'

import React, { useState } from 'react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAccept = () => {
        console.log('Cookies acceptés');
        setIsVisible(false);
    };

    const handleDecline = () => {
        console.log('Cookies refusés');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl p-4 bg-gray-800 bg-opacity-90 backdrop-blur-sm text-white rounded-lg shadow-lg flex flex-col justify-between text-center">
            <span>
                En acceptant les cookies, je souhaite améliorer mon expérience sur ce site et recevoir des
                contenus personnalisés. Pour plus d&apos;informations, consultez notre politique de cookies.
            </span>
            <div className="flex justify-end mt-4">
                <button onClick={handleAccept} className="bg-green-500 p-2 mx-2 rounded">Accepter</button>
                <button onClick={handleDecline} className="bg-gray-700 p-2 mx-2 rounded">Refuser</button>
            </div>
        </div>
        
    );
};

export default CookieBanner;
