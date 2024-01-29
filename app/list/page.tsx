import LoginSignup from '@/components/atomicDesign/mollecules/forms/LoginSignup'
import PlantList from '@/components/atomicDesign/mollecules/lists/PlantList'
import React from 'react'

type Props = {}

function List_page({}: Props) {


  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24 '>
        <PlantList/>
    </main>
  )
}

export default List_page