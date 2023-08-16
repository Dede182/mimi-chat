import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import "swiper/css";

const ChatHeadSwiper = ({casts }) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [my_swiper, set_my_swiper] = useState<any>();


  return (
    <div className="recent-swiper w-full relative mt-6 px-10">
    <Swiper
      className="flex-1 !mx-2 mySwiper hidden"
      slidesPerView={2}
     
      spaceBetween={40}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Navigation]}
      onInit={(ev) => {
        set_my_swiper(ev);
      }}
    >
      {casts?.cast?.map((cast : object, index : string) => (
        <SwiperSlide key={index}>
          <div className="avatar online  ">
            <div className="h-28 rounded-xl shadow-lg relative">
              <img src={`https://i.pravatar.cc/250?img=${index}`} />
              <div className='absolute bottom-4  text-white right-2 flex justify-between items-center'>
                  <p>{cast.name !}</p>

              </div>
            </div>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default ChatHeadSwiper