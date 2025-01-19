import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";




const PropertyDetails = () => {
  const { id } = useParams(); // Property ID from the route
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const {user} = useAuth()
  // eslint-disable-next-line no-unused-vars
  const [ reviewStatus, setReviewStatus] = useState('pending');
  const [reviews, setReviews] = useState([]);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);


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
        // Show SweetAlert confirmation
        Swal.fire({
          icon: 'success',
          title: 'Property added to wishlist!',
          showConfirmButton: true,
        });
        setIsAddedToWishlist(true); // Disable the button after adding to wishlist
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to add to wishlist!',
          text: error.message,
        });
      });
  };
  
  

  const handleSubmit = () => {
    // Submit review with status 'pending'
    const reviewData = {
      text: reviewText,
      userId: user.uid,
      username: user.displayName,
      userPhoto: user.photoURL,
      reviewStatus: 'pending', // Initially set to 'pending'
    };
  
    axiosSecure
      .post(`/reviews/${id}`, reviewData) // Assuming reviews endpoint for the property
      .then(() => {
        setReviewStatus('pending'); // Reset the review status to pending
        setShowModal(false); // Close the modal
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted!',
          text: 'Your review is pending approval.',
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to submit review!',
          text: error.message,
          showConfirmButton: true,
        });
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
  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition mb-6"
  disabled={isAddedToWishlist} // Disable the button if property is added to the wishlist
>
  {isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
</button>

{reviews.map((review) => (
  review.reviewStatus === 'approved' && (
    <div key={review._id} className="flex flex-col md:flex-row items-start p-6 bg-white rounded-lg shadow-lg mb-6 transition-all hover:shadow-2xl">
      
      {/* Left Section: User Image and Name */}
      <div className="flex flex-col items-center space-y-3 md:w-1/4">
        <img
          src={review.userPhoto}
          alt={review.username}
          className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />
        <span className="font-semibold text-lg text-gray-800">{review.username}</span>
        
      </div>
      
      {/* Right Section: Review Content */}
      <div className="md:ml-8 w-full md:w-3/4 flex flex-col justify-between space-y-4">
        
        {/* Review Text */}
        <p className="text-gray-700 text-lg mt-2">
          {review.text}
        </p>
        
        {/* Helpful Button */}
        <button className="self-start text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Helpful
        </button>

        <span className="text-sm text-gray-500">{review.createdAt}</span>
      </div>
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
