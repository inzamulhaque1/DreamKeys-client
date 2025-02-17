import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import sl1 from "../../assets/images/sliders/sl1.jpg";
import sl2 from "../../assets/images/sliders/sl2.jpg";
import sl3 from "../../assets/images/sliders/sl3.jpg";
import sl4 from "../../assets/images/sliders/sl4.jpg";
import sl5 from "../../assets/images/sliders/sl5.jpg";
import sl6 from "../../assets/images/sliders/sl6.jpg";

const Slider = () => {
  // Array of slides with background images and text
  const slides = [
    {
      image: sl1,
      heading: "Discover Your Dream Home",
      text: "Explore our exclusive collection of luxurious properties.",
    },
    {
      image: sl2,
      heading: "Modern Living Spaces",
      text: "Experience the perfect blend of comfort and style.",
    },
    {
      image: sl3,
      heading: "Family-Friendly Environments",
      text: "Find homes designed for your family's happiness.",
    },
    {
      image: sl4,
      heading: "Luxury Redefined",
      text: "Indulge in premium amenities and breathtaking views.",
    },
    {
      image: sl5,
      heading: "Pet-Friendly Homes",
      text: "Spaces where your furry friends feel at home.",
    },
    {
      image: sl6,
      heading: "Entertain in Style",
      text: "Perfect settings for hosting unforgettable gatherings.",
    },
  ];

  return (
    <div className="dark:bg-[#0B0716]  py-8">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 3000, // Auto-slide every 3 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        loop={true} // Enable infinite loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Slide content */}
              <div className="relative z-10 text-center text-white px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {slide.heading}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto">
                  {slide.text}
                </p>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                  Explore Properties
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;