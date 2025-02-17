import backgroundImage from "../../assets/images/bg/bgg4.jpg";

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Blue shade overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-40"></div>

      {/* Centered content */}
      <div className="relative mx-4 z-10 text-center bg-black bg-opacity-50 dark:bg-opacity-70 p-6 sm:p-8 md:p-10 lg:p-12 text-white px-4 rounded-lg shadow-lg">

        <p className="text-base exo2 sm:text-lg md:text-xl max-w-md mx-auto  mb-2">
          Exclusive
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-merriweather">
          Top Real Estate Listings in Seattle
        </h1>
        <p className="text-base font-josefin sm:text-lg md:text-xl max-w-md mx-auto ">
          Your one-stop solution for all things tech and more.
        </p>

        {/* Example button with blue-600 color */}
        <button className="mt-6 exo2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          Explore Listings
        </button>
      </div>
    </div>
  );
};

export default Hero;