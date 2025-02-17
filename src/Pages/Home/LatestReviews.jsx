import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUser, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa'; // Importing icons

// eslint-disable-next-line react/prop-types
const LatestReviews = ({ propertyId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch reviews for the specific property
                const response = await axiosSecure.get(`/reviews`);

                if (response.status === 200 && Array.isArray(response.data)) {
                    // Filter reviews to include only those with 'approved' status
                    const approvedReviews = response.data.filter(review => review.reviewStatus === 'approved');

                    // Sort reviews by 'createdAt' descending to show the latest first, then limit to 4
                    const latestReviews = approvedReviews
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting in descending order
                        .slice(0, 4); // Take the first 4 reviews

                    setReviews(latestReviews);
                } else {
                    setReviews([]);
                }
            } catch (error) {
                setError(error, 'Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [propertyId, axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-6">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="reviews-container w-9/12 mx-auto py-12 px-4 bg-gray-50 dark:bg-[#0B0716]">
            {/* Title and Subtitle */}
            <div className="text-center mb-10">
                <h2 className="exo2 text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    What Our Clients Say
                </h2>
                <p className="libre text-lg text-gray-600 dark:text-gray-300">
                    Discover what our satisfied clients have to say about their experiences with us.
                </p>
            </div>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No reviews yet.
                </p>
            ) : (
                <div className="review-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="review-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform"
                        >
                            {/* User Info Section */}
                            <div className="review-header flex items-center space-x-4 mb-4">
                                <div className="relative">
                                    <img
                                        src={review.userPhoto}
                                        alt={review.username}
                                        className="review-user-photo w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                                        <FaUser className="text-white text-xs" />
                                    </div>
                                </div>
                                <div className="review-user-info">
                                    <p className="review-username text-lg font-semibold text-gray-900 dark:text-white font-merriweather">
                                        {review.username}
                                    </p>
                                    <p className="review-status text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                        <FaCheckCircle className="mr-1 text-green-500" />
                                        {review.reviewStatus}
                                    </p>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="review-text text-gray-700 dark:text-gray-300 mt-4 italic libre">
                                {review.text}
                            </p>

                            {/* Review Footer */}
                            <div className="review-footer mt-4 flex items-center justify-between">
                                <p className="review-date text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                    <FaCalendarAlt className="mr-2" />
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestReviews;