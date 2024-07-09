import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json({ error: 'no query' }, { status: 404 })
        }

        const url = `http://trefle.io/api/v1/plants?token=${process.env.NEXT_PUBLIC_TREFLE_TOKEN}&searh?q=${query}`;
        
        const apiData = await fetch(url);

        if (!apiData.ok) {
            throw new Error(`Erreur HTTP ${apiData.status} - ${apiData.statusText}`);
        }

        const data = await apiData.json();

        const plants = data.data.map((item:{id:string,common_name:string, scientific_name:string,image_url:string}) => ({
            id: item.id,
            common_name: item.common_name,
            scientific_name: item.scientific_name,
            image_url: item.image_url
        }));

        return NextResponse.json({ plants });
    } catch (error) {
        console.error('Erreur lors de la récupération ou du traitement des données depuis Trefle.io:', error);
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
