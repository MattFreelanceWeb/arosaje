export const fetchFromTrefle = async (query:string) => {


  const url = `https://trefle.io/api/v1/plants/search?token=${process.env.NEXT_PUBLIC_TREFLE_TOKEN}&q=${query}`

  try {
    const apiData = await fetch(url)
    const data = await apiData.json()

    console.log(data)
  }
  catch(error) {
    console.log(error)
  }
}