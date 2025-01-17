import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";



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
    return <div>Loading wishlist...</div>;
  }



  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">Location: {item.location}</p>
              <div className="flex items-center gap-2 my-2">
                <img
                  src={item.agentImageUrl}
                  alt={item.agentName}
                  className="w-10 h-10 rounded-full"
                />
                <p>{item.agentName}</p>
              </div>
              <p className="text-gray-600">
                Verification:{" "}
                <span className="font-semibold">
                  {item.verificationStatus}
                </span>
              </p>
              <p className="text-gray-600">
                Price Range: ${item.priceRange.min} - ${item.priceRange.max}
              </p>
              <Link to={`/dashboard/make-offer/${item._id}`}><button  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-4">
                Make an Offer
              </button>
              </Link>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition mt-4 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
