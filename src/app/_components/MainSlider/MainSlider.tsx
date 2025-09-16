"use client";
import React from "react";
import Slider1 from "../../../../public/images/slider/slider-image-1.jpeg";
import Slider2 from "../../../../public/images/slider/slider-image-2.jpeg";
import Slider3 from "../../../../public/images/slider/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto my-6 flex ">
      <div className="w-3/4">
        <Swiper
          spaceBetween={50}
          slidesPerView={"auto"}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            {" "}
            <Image
              alt="ProductImage"
              src={Slider3}
              className="h-[300px] object-cover w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Image
              alt="ProductImage"
              src={Slider2}
              className="h-[300px] object-cover w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Image
              alt="ProductImage"
              src={Slider1}
              className="h-[300px] object-cover w-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image
          alt="ProductImage"
          className="h-[150px] object-cover w-full"
          src={Slider2}
        />
        <Image
          alt="ProductImage"
          className="h-[150px] object-cover w-full"
          src={Slider3}
        />
      </div>
    </div>
  );
}
