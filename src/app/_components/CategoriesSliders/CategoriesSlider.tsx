import getAllCategories from '@/services/getCategories'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';

export default async function CategoriesSlider() {

   const data =await getAllCategories()
   console.log(data);
   
  return (
    <>
    <CategorySwiper data={data}/>
    </>
  )
}
