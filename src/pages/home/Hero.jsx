import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Dummy image data
const HomeHeroData = [
  { img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1719843454/Croma%20Assets/Small%20Appliances/Fans/Images/272540_0_qzrghu.png?tr=w-400" },
  { img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1719328192/Croma%20Assets/Small%20Appliances/Fans/Images/302481_0_runoxw.png?tr=w-400" },
  { img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1719329548/Croma%20Assets/Small%20Appliances/Fans/Images/301665_0_mrm41d.png?tr=w-400" },
  { img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1724856225/Croma%20Assets/Small%20Appliances/Fans/Images/304602_0_dg5rq1.png?tr=w-400" },
  { img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1719329013/Croma%20Assets/Small%20Appliances/Fans/Images/232311_0_nn7png.png?tr=w-400" },
];

export const Hero = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-[40vh] md:h-[50vh] lg:h-[65vh] xl:h-[72.5vh]"
      >
        {HomeHeroData.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.img}
              alt={`Slide ${index + 1}`}
              onLoad={() => setLoading(false)}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <span className="text-gray-700 text-lg">Loading images...</span>
        </div>
      )}
    </div>
  );
};
