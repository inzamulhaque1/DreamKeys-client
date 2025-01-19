import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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

                    // Sort reviews by 'createdAt' descending to show the latest first, then limit to 3
                    const latestReviews = approvedReviews
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sorting in descending order
                        .slice(0, 3); // Take the first 3 reviews

                    setReviews(latestReviews);
                } else {
                    setReviews([]);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [propertyId, axiosSecure]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="reviews-container py-6 px-4 bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Latest Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews yet.</p>
            ) : (
                <div className="review-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="review-card bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                            <div className="review-header flex items-center space-x-4">
                                <img
                                    src={review.userPhoto}
                                    alt={review.username}
                                    className="review-user-photo w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                />
                                <div className="review-user-info">
                                    <p className="review-username text-lg font-semibold text-gray-900">{review.username}</p>
                                    <p className="review-status text-sm text-gray-600">{review.reviewStatus}</p>
                                </div>
                            </div>
                            <p className="review-text text-gray-700 mt-3">{review.text}</p>
                            <p className="property-title text-gray-600 mt-2">Property Title: <span className="font-semibold">{review.propertyTitle}</span></p>
                            <div className="review-footer mt-3">
                                <p className="review-date text-sm text-gray-500">
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
