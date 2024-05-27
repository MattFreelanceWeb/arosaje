  export interface User {
    userId: number;
    userName: string;
    email: string;
    address: Address[];
    plantsOwned: PlantForUser[];
    plantsGuarded: PlantForUser[];
  }

  export interface Address {
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

  export interface PlantForUser {
    common_name: string;
    scientific_name: string;
    image_url: string;
  }

  export interface PlantForList {
    id: number;
    common_name: string;
    scientific_name: string;
    image_url: string;
    ownerId: number;
    guardianId: number | null;
    addressId: number;
    createdAt: string;
    updatedAt: string;
    owner: {
        id: number;
        email: string;
        userName: string;
        password: string;
        imageSrc: string | null;
        createdAt: string;
        updatedAt: string;
    };
    comment: any[]; // Vous pouvez définir un type spécifique pour les commentaires si nécessaire
}

  export interface PlantData {
    common_name?: string;
    scientific_name?: string;
    image_url?: string;
    addressId?: number;
  }