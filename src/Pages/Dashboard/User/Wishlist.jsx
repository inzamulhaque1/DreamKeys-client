import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash, FaHandshake, FaMapMarkerAlt,  FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // React Icons for better visuals

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch all wishlist items
    axiosSecure
      .get("/wishlist")
      .then((response) => {
        setWishlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [axiosSecure]);

  const handleRemove = (id) => {
    axiosSecure
      .delete(`/wishlist/${id}`)
      .then(() => {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  return (
    <div className="p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Property Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Property Title */}
              <h2 className="text-xl font-semibold dark:text-white">{item.title}</h2>

              {/* Property Location */}
              <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                <FaMapMarkerAlt className="mr-2" />
                <p>{item.location}</p>
              </div>

              {/* Agent Info */}
              <div className="flex items-center gap-2 my-4">
                <img
                  src={item.agentImageUrl}
                  alt={item.agentName}
                  className="w-10 h-10 rounded-full"
                />
                <p className="dark:text-white">{item.agentName}</p>
              </div>

              {/* Verification Status */}
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                {item.verificationStatus === "verified" ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" />
                )}
                <p className="font-semibold">{item.verificationStatus}</p>
              </div>

              {/* Price Range */}
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Price Range: ${item.priceRange.min} - ${item.priceRange.max}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <Link to={`/dashboard/make-offer/${item._id}`}>
                  <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                    <FaHandshake className="mr-2" />
                    Make an Offer
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                  <FaTrash className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;