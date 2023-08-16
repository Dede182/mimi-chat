import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import { CastType, MemorizedChatHeadItem } from './ChatHeadSwiperItem';

type CastsProps = {
  casts : Array<CastType>
}
const ChatHeadSwiper = ({casts } : CastsProps) => {

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
      {casts.map((cast : CastType) => (
        <SwiperSlide key={cast.id + Math.random()}>
          <MemorizedChatHeadItem  cast={cast} />

        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default ChatHeadSwiper