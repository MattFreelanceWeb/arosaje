'use client'


import { useRouter } from 'next/navigation';
import React, { ReactElement, ReactNode, createContext, useEffect, useState } from 'react';

const jwt = require("jsonwebtoken")

interface isAuthContextType {
  isAuth: boolean| undefined;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const isAuthContext = createContext<isAuthContextType>({
  isAuth: false,
  setIsAuth: () => undefined,
});

export const IsAuthProvider= ({ children }:any) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(false);

  const router =useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');

    const isTokenExpired = (token:string) => {
      try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
          return true; // Le token est invalide ou expiré
        }
    
        const currentTimestamp = Date.now() / 1000; // Timestamp actuel en secondes
        const expirationTimestamp = decodedToken.payload.exp; // Date d'expiration du token en secondes
    
        return expirationTimestamp < currentTimestamp; // Le token est expiré si la date d'expiration est antérieure à l'heure actuelle
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        return true; // En cas d'erreur, considérer le token comme expiré
      }
    };

    token && isTokenExpired(token as string) && router.push("/connection")
  
  }, [router])
  


  return (
    <isAuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </isAuthContext.Provider>
  );
};