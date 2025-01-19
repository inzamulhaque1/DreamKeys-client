import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";




const PropertyDetails = () => {
  const { id } = useParams(); // Property ID from the route
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const {user} = useAuth()
  const [ setReviewStatus] = useState('pending');
  const [reviews, setReviews] = useState([]);


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

      axiosSecure
  .get(`/reviews/${id}`)
  .then((response) => {
    if (response.data.length === 0) {
      console.log('No reviews available for this property.');
    }
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

  const handleSubmit = () => {
    // Submit review with status 'pending'
    const reviewData = {
      text: reviewText,
      userId: user.uid, // Assuming you have user UID
      username: user.displayName,
      userPhoto: user.photoURL,
      reviewStatus: 'pending', // Initially set to 'pending'
    };

    axiosSecure
      .post(`/reviews/${id}`, reviewData) // Assuming reviews endpoint for the property
      .then(() => {
        console.log('Review Submitted:', reviewText);
        setReviewStatus('pending'); // Reset the review status to pending
        setShowModal(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
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

              {/* Display reviews section */}
        
              {reviews.map((review) => (
  review.reviewStatus === 'approved' && (
    <div key={review._id} className="mt-8 p-4 bg-gray-100 rounded-md">
      <h3 className="font-semibold text-xl">User Review</h3>
      <div className="flex items-center mt-4">
        <img src={review.userPhoto} alt={review.username} className="w-12 h-12 rounded-full mr-4" />
        <span className="font-semibold text-lg">{review.username}</span>
      </div>
      <p className="text-gray-700 mt-2">{review.text}</p>
    </div>
  )
))}

      {/* Review Section */}
      <div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Write a Review
      </button>




      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex items-center mb-4">
              <img src={user.photoURL} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
              <span className="font-semibold text-lg">{user.displayName}</span>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full h-32 p-2 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      
    </div>



  );
};

export default PropertyDetails;
