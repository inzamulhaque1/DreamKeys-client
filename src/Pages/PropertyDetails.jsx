import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";


const PropertyDetails = () => {
  const { id } = useParams(); // Property ID from the route
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();


  useEffect(() => {
    // Fetch property details
    axiosSecure
      .get(`/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
        
      });

    // Fetch reviews for the property
    axiosSecure
      .get(`/properties/${id}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        
      });
  }, [id, axiosSecure]);

  const handleAddToWishlist = () => {
    axiosSecure
      .post(`/wishlist`, { propertyId: id })
      .then(() => {
        // Show confirmation
        alert("Property added to wishlist!");
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
      });
  };

  const handleAddReview = (reviewText) => {
    axiosSecure
      .post(`/properties/${id}/reviews`, { review: reviewText })
      .then(() => {
        
        // Refresh reviews
        return axiosSecure.get(`/properties/${id}/reviews`);
      })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        
      });
  };

  if (loading) {
    return <div>Loading property details...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Description:</span> {property.description}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Price Range:</span> ${property.priceRange.min} - $
        {property.priceRange.max}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Agent:</span> {property.agentName}
      </p>
      <button
        onClick={handleAddToWishlist}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mb-6"
      >
        Add to Wishlist
      </button>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-sm text-gray-500">- {review.user}</p>
            </div>
          ))
        )}
        <button
          onClick={() => handleAddReview("Your review text here")}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mt-4"
        >
          Add a Review
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
