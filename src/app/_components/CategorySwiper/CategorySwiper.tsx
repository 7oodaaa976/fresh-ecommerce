"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { categoryType } from './../../../Types/category.type';

export default function CategorySwiper({ data } :{data:categoryType[]}) {
  console.log(data);

  return (
    <>
    <div className="w-[80%] mx-auto">
        <h1 className="mb-4">Shop popular Categories ⬇️</h1>
  <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Image
            width={300}
            height={300}
              src={item.image}
              alt="sliderImage"
              className=" object-cover h-[100px]"
            />

            <p className="text-center">{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>




    </div>
    </>
  );
}
