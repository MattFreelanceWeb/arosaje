import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        // const searchParams = request.nextUrl.searchParams;
        // const query = searchParams.get('query');

        // if (!query) {
        //     return NextResponse.json({ error: 'no query' }, { status: 404 })
        // }

        // const url = `http://trefle.io/api/v1/plants?token=${process.env.NEXT_PUBLIC_TREFLE_TOKEN}&searh?q=${query}`;
        
        // const apiData = await fetch(url);

        // if (!apiData.ok) {
        //     throw new Error(`Erreur HTTP ${apiData.status} - ${apiData.statusText}`);
        // }

        // const data = await apiData.json();


        const plants =  [
              {
                "id": 77116,
                "common_name": "Evergreen oak",
                "scientific_name": "Quercus rotundifolia",
                "image_url": "https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg"
              },
              {
                "id": 109482,
                "common_name": "Common nettle",
                "scientific_name": "Urtica dioica",
                "image_url": "https://bs.plantnet.org/image/o/9db58cbb3538a6b77384f972971d51869228e545"
              },
              {
                "id": 227114,
                "common_name": "Barnyard grass",
                "scientific_name": "Dactylis glomerata",
                "image_url": "https://bs.plantnet.org/image/o/f84a7d4fc2e627ccd451f568479b1932c2b2d900"
              },
              {
                "id": 128860,
                "common_name": "Narrow-leaf plantain",
                "scientific_name": "Plantago lanceolata",
                "image_url": "https://bs.plantnet.org/image/o/f8d7d6fe52e36d04f5ad1fc03f46f604d5c3cc43"
              },
              {
                "id": 11971,
                "common_name": "Milfoil",
                "scientific_name": "Achillea millefolium",
                "image_url": "https://bs.plantnet.org/image/o/d788a757cd8bac8c3b1378a970c078a7a937a174"
              },
              {
                "id": 51662,
                "common_name": "Dutch clover",
                "scientific_name": "Trifolium repens",
                "image_url": "https://bs.plantnet.org/image/o/170ca6a6020d9e9f95f86112577aeabcb23f5b96"
              },
              {
                "id": 230202,
                "common_name": "Yorkshire-fog",
                "scientific_name": "Holcus lanatus",
                "image_url": "https://bs.plantnet.org/image/o/c0800816e2f56ed6e7702c31efd91afcdfddd68c"
              },
              {
                "id": 122042,
                "common_name": "Creeping buttercup",
                "scientific_name": "Ranunculus repens",
                "image_url": "https://bs.plantnet.org/image/o/90746f2a4592ed4dbc6a166234f488654565605e"
              },
              {
                "id": 77107,
                "common_name": "Pedunculate oak",
                "scientific_name": "Quercus robur",
                "image_url": "https://bs.plantnet.org/image/o/0d16977470dfdcd37d495a5b33c2f343224ebe98"
              },
              {
                "id": 229588,
                "common_name": "Red fescue",
                "scientific_name": "Festuca rubra",
                "image_url": "https://bs.plantnet.org/image/o/fb1967942b880fb7c978ff76741d348a22611b88"
              },
              {
                "id": 221416,
                "common_name": "European ash",
                "scientific_name": "Fraxinus excelsior",
                "image_url": "https://bs.plantnet.org/image/o/84ef20b0276c3e0a6d32dd97a7b987b510feb961"
              },
              {
                "id": 1999,
                "common_name": "California thistle",
                "scientific_name": "Cirsium arvense",
                "image_url": "https://d2seqvvyy3b8p2.cloudfront.net/c7d6d18dfbd69cbf043001fb3204517c.jpg"
              },
              {
                "id": 51657,
                "common_name": "Cowgrass clover",
                "scientific_name": "Trifolium pratense",
                "image_url": "https://bs.plantnet.org/image/o/3bb52539dcca8b6bf19b9bf752631def901ba64c"
              },
              {
                "id": 257312,
                "common_name": "Beech",
                "scientific_name": "Fagus sylvatica",
                "image_url": "https://bs.plantnet.org/image/o/a733221df31a1ff99af03566841744f3b4c6cffe"
              },
              {
                "id": 208738,
                "common_name": "Soft rush",
                "scientific_name": "Juncus effusus",
                "image_url": "https://d2seqvvyy3b8p2.cloudfront.net/31545c7b5c65236a5d7f28ca040ee058.jpg"
              },
              {
                "id": 121255,
                "common_name": "Meadow buttercup",
                "scientific_name": "Ranunculus acris",
                "image_url": "https://bs.plantnet.org/image/o/43c58aa2ef3d5a11ac1dd83d9b465e639338a3da"
              },
              {
                "id": 265334,
                "common_name": "Hawthorn",
                "scientific_name": "Crataegus monogyna",
                "image_url": "https://bs.plantnet.org/image/o/9a428f47e57e087f677d58967659592f8232c737"
              },
              {
                "id": 106738,
                "common_name": "Garden sorrel",
                "scientific_name": "Rumex acetosa",
                "image_url": "https://bs.plantnet.org/image/o/b07ad83adb571370a40982de0ec45248871486d6"
              },
              {
                "id": 155762,
                "common_name": "Heather",
                "scientific_name": "Calluna vulgaris",
                "image_url": "https://d2seqvvyy3b8p2.cloudfront.net/04a6d1e14c82502b58222574e2a99cde.jpg"
              },
              {
                "id": 262017,
                "common_name": "Meadowsweet",
                "scientific_name": "Filipendula ulmaria",
                "image_url": "https://bs.plantnet.org/image/o/53c73903dc455a3d734b193dad7d9d8c4ec0e324"
              }
            ]
          

        return NextResponse.json({ plants });
    } catch (error) {
        console.error('Erreur lors de la récupération ou du traitement des données depuis Trefle.io:', error);
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
