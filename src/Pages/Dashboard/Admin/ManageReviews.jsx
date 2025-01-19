import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch review data from the backend
        axiosSecure
            .get('/reviews')
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    const updateReviewStatus = (reviewId, status) => {
        // Update review status on the backend
        axiosSecure
            .put(`/reviews/${reviewId}`, { reviewStatus: status })
            .then((res) => {
                console.log(res);
                // Update the local state to reflect the new status
                setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                        review._id === reviewId ? { ...review, reviewStatus: status } : review
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating review status:", error);
            });
    };

    const handleApprove = (reviewId) => {
        updateReviewStatus(reviewId, 'approved');
    };

    const handleReject = (reviewId) => {
        updateReviewStatus(reviewId, 'rejected');
    };

    const handleDelete = (reviewId) => {
        // Delete review from the backend
        axiosSecure
            .delete(`/reviews/${reviewId}`)
            .then(() => {
                // Remove review from local state
                setReviews((prevReviews) =>
                    prevReviews.filter((review) => review._id !== reviewId)
                );
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border">Reviewer Image</th>
                            <th className="px-4 py-2 border">Reviewer Name</th>
                            
                            <th className="px-4 py-2 border">Review</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">
                                    <img
                                        src={review.userPhoto || "/default-avatar.png"}
                                        alt="Reviewer"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{review.username}</td>
                                
                                <td className="px-4 py-2 border">{review.text}</td>
                                <td className="px-4 py-2 border capitalize">{review.reviewStatus}</td>
                                <td className="px-4 py-2 border">
                                    {review.reviewStatus === 'pending' && (
                                        <>
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => handleApprove(review._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleReject(review._id)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {review.reviewStatus === 'approved' && (
                                        <span className="text-green-500">Approved</span>
                                    )}
                                    {review.reviewStatus === 'rejected' && (
                                        <span className="text-red-500">Rejected</span>
                                    )}
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageReviews;
