import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2"; // Import SweetAlert2

const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/reviews/user/${user.uid}`)
        .then((response) => {
          setUserReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user reviews:", error);
        });
    }
  }, [user, axiosSecure]);

  const handleDelete = (reviewId) => {
    // Show SweetAlert confirmation before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, send delete request
        axiosSecure
          .delete(`/reviews/${reviewId}`)
          .then(() => {
            // Filter out the deleted review from the state
            setUserReviews((prevReviews) =>
              prevReviews.filter((review) => review._id !== reviewId)
            );
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire("Error!", "There was an error deleting the review.", "error");
          });
      }
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">My Reviews</h2>
      {userReviews.length === 0 ? (
        <p className="text-lg text-gray-600">You haven&apos;t submitted any reviews yet.</p>
      ) : (
        userReviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-2">{review.propertyId}</h3>
            <p className="text-lg mb-4">{review.text}</p>
            <span className="text-sm text-gray-500">
              Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
            </span>

            <div
              className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
                review.reviewStatus === "approved"
                  ? "bg-green-500 text-white"
                  : review.reviewStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              Status: {review.reviewStatus}
            </div>

            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Review
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
