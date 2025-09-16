"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { categoryType } from './../../../Types/category.type';

export default function CategorySwiper({ data }: { data: categoryType[] }) {
  console.log(data);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="mb-4 text-center">Shop popular Categories ⬇️</h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 10 }, 
          480: { slidesPerView: 3, spaceBetween: 10 }, 
          640: { slidesPerView: 4, spaceBetween: 15 }, 
          768: { slidesPerView: 5, spaceBetween: 15 },
          1024: { slidesPerView: 7, spaceBetween: 20 }, 
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <Image
              width={300}
              height={300}
              src={item.image}
              alt={item.name}
              className="object-cover h-[80px] sm:h-[100px] mx-auto"
            />
            <p className="text-center mt-2 text-sm sm:text-base">{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
