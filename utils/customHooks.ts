import { useState, useEffect } from 'react';
import { User, Address, PlantForUser, PlantForList, PlantData } from './interfaces';
import { useParams, useRouter } from "next/navigation";
const jwt = require("jsonwebtoken");

export function useFetchUser() {

  const [user, setUser] = useState<User>()
  const router = useRouter()
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
  
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`
  
          const response = await fetch(url, {
            method: "GET",
            headers: headers,
          });
          if (!response.ok) {
            if(response.status === 403){
              localStorage.removeItem('token')
              router.push("/connection")
            }
            console.log(response)
            throw new Error("Erreur lors de la récupération des données des plantes");
          }
          const data = await response.json();
  
          //log for dev mode
          console.log(data)
  
          setUser({...data, id: userId})
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUser()
  
    }, [])

    return user
}

export function useFetchPlants() {
  
  const [plants, setPlants] = useState<PlantForList[]>()
  
  const params = useParams()
  const router = useRouter()
  useEffect(() => {

    const token = localStorage.getItem('token')
  
    const decodedQueryString = decodeURIComponent(params.list_id as string);
  
    const paramsToGet = decodedQueryString.split("&");
  
    const queryParams: any = {};
  
    paramsToGet.forEach(param => {
        const [key, value] = param.split("=");
        queryParams[key] = parseInt(value);
    });
  
    const userId = queryParams["userId"];
    const addressId = queryParams["addressId"];
  
  
    const fetchPlants = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
  
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/plant/${userId}/${addressId}`
  
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
  
            setPlants(data.data);
        } catch (error) {
            console.error(error);
        }
    }
  
    fetchPlants();
  }, []);

  return plants

}
