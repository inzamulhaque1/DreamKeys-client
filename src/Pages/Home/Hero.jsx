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
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Centered content */}
      <div className="relative z-10 text-center bg-black bg-opacity-50 p-10 text-white px-4">

        <p className="text-lg max-w-md mx-auto font-merriweather mb-2">
          Exclusive
        </p>
        <h1 className="text-4xl font-bold mb-4 font-merriweather">
          Top Real Estate Listings in Seattle
        </h1>
        <p className="text-lg max-w-md mx-auto font-merriweather">
          Your one-stop solution for all things tech and more.
        </p>
      </div>
    </div>
  );
};

export default Hero;
