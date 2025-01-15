import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to the update form page
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const MyAddedProperties = () => {
    const [properties, setProperties] = useState([]);
    const { user } = useAuth(); // Assuming useAuth gives you the logged-in user information
    const axiosSecure = useAxiosSecure(); // Custom hook for secure axios requests
    const navigate = useNavigate(); // To navigate to the update form page

    useEffect(() => {
        if (!user) {
            return; // If no user, don't fetch properties
        }

        // Fetch properties added by the logged-in agent
        axiosSecure.get(`/properties?agentEmail=${user.email}`)  // Ensure correct API endpoint
            .then(response => {
                setProperties(response.data); // Handle success
            })
            .catch(error => {
                console.error("Error fetching properties:", error); // Handle error
            });
    }, [user, axiosSecure]); // Dependencies: user and axiosSecure to trigger fetch when user info is available

    const handleUpdate = (property) => {
        // Redirect to update page with the property id
        navigate(`/update-property/${property._id}`, { state: { property } });
    };

    const handleDelete = (propertyId) => {
        // Delete the property from the database
        axiosSecure.delete(`/properties/${propertyId}`)
            .then(() => {
                // Remove from the UI after successful delete
                setProperties(properties.filter(property => property._id !== propertyId));
            })
            .catch(error => {
                console.error("Error deleting property:", error);
            });
    };

    if (!user) {
        return <div>Please log in to view your added properties.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <div key={property._id} className="border rounded-lg p-4 shadow-lg">
                    {/* Property Image */}
                    <img 
                        src={property.imageUrl || 'fallback-image-url.jpg'} 
                        alt={property.title} 
                        className="w-full h-48 object-cover rounded-md"
                    />

                    {/* Property Title */}
                    <h3 className="text-xl font-semibold mt-4">{property.title}</h3>

                    {/* Property Location */}
                    <p className="text-gray-600">{property.location}</p>

                    {/* Verification Status */}
                    <p className={`mt-2 ${property.verificationStatus === 'verified' ? 'text-green-500' : property.verificationStatus === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {property.verificationStatus}
                    </p>

                    {/* Price Range */}
                    <p className="mt-2">
                        Price Range: ${property.priceRange.min} - ${property.priceRange.max}
                    </p>

                    {/* Agent Info */}
                    <div className="mt-4 flex items-center">
                        {/* Use the user image if available, fallback if not */}
                        <img 
                            src={user.photoURL || 'fallback-agent-image-url.jpg'} 
                            alt={user.name} 
                            className="w-10 h-10 rounded-full mr-3" 
                        />
                        <p className="font-medium">{user.name}</p>
                    </div>

                    {/* Update and Delete buttons */}
                    <div className="mt-4 flex justify-between">
                        {property.verificationStatus !== 'rejected' && (
                            <button
                                onClick={() => handleUpdate(property)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        )}

                        <button
                            onClick={() => handleDelete(property._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyAddedProperties;
