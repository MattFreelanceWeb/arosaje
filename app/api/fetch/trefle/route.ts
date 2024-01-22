import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest , response:NextResponse) {

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!!query) {
        const url = `https://trefle.io/api/v1/plants/search?token=${process.env.NEXT_PUBLIC_TREFLE_TOKEN}&q=${query}`

        try {
            const apiData = await fetch(url)
            const data = await apiData.json()

            const plant =  (data.data as any[]).map(item => ({ id: item.id, common_name: item.common_name, scientific_name: item.scientific_name, image_url: item.image_url }))

            return NextResponse.json({plant})
        }
        catch (error) {
            console.log(error)
        }
    }

}