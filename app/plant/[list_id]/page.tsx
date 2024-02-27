import PlantList from '@/components/atomicDesign/mollecules/lists/PlantList'
import React from 'react'

type Props = {}

function Plant_list_id_page({}: Props) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <PlantList/>
    </main>
  )
}

export default Plant_list_id_page