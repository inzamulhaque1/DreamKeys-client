import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import sl1 from "../../assets/images/sliders/sl1.jpg";
import sl2 from "../../assets/images/sliders/sl2.jpg";
import sl3 from "../../assets/images/sliders/sl3.jpg";
import sl4 from "../../assets/images/sliders/sl4.jpg";
import sl5 from "../../assets/images/sliders/sl5.jpg";
import sl6 from "../../assets/images/sliders/sl6.jpg";

const Slider = () => {
  // Array of slides with background images and text
  const slides = [
    { image: sl1, text: "Beautiful Garden" },
    { image: sl2, text: "House Pool" },
    { image: sl3, text: "Playing Area" },
    { image: sl4, text: "BBQ Area" },
    { image: sl5, text: "Pet House" },
    { image: sl6, text: "Party Area" },
  ];

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper m-5">
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[600px] sm:h-[600px] bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${slide.image})`  }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
              {slide.text}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
