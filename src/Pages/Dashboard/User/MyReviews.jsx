import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2"; // Import SweetAlert2
import { FaTrash, FaEdit, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch user reviews
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

  // Handle delete review
  const handleDelete = (reviewId) => {
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
        axiosSecure
          .delete(`/reviews/${reviewId}`)
          .then(() => {
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

  // Handle edit review (placeholder for now)
  const handleEdit = () => {
    Swal.fire({
      title: "Edit Review",
      text: "This feature is under development!",
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  // Get status icon based on review status
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="p-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-center">My Reviews</h2>
      {userReviews.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
          You haven&apos;t submitted any reviews yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.userPhoto}
                  alt={review.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold dark:text-gray-100">
                    {review.username}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {review.text}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    review.reviewStatus === "approved"
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : review.reviewStatus === "pending"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                  }`}
                >
                  {getStatusIcon(review.reviewStatus)}
                  <span>Status: {review.reviewStatus}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(review._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;