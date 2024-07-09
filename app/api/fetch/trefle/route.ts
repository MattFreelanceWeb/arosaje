import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (query) {
        const url = `https://trefle.io/api/v1/plants/search?token=${process.env.NEXT_PUBLIC_TREFLE_TOKEN}&q=${query}`;

        try {
            const apiData = await fetch(url);

            if (!apiData.ok) {
                throw new Error(`Erreur lors de la requête à l'API Trefle.io: ${apiData.statusText}`);
            }

            const data = await apiData.json();

            if (!data || !data.data || !Array.isArray(data.data)) {
                throw new Error('Réponse de l\'API Trefle.io invalide');
            }

            const plants = data.data.map((item : {id:string,common_name:string, scientific_name:string,image_url:string}) => ({
                id: item.id,
                common_name: item.common_name,
                scientific_name: item.scientific_name,
                image_url: item.image_url
            }));

            return NextResponse.json({ plants });
        } catch (error) {
            console.error('Erreur lors de la récupération des données depuis Trefle.io:', error);
            return NextResponse.error();
        }
    }

    return NextResponse.error();
}