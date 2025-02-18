import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to the update form page
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa'; // React Icons for better visuals

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
                console.error("Error fetching properties:", error); // Handle err
            });
    }, [user, axiosSecure]); // Dependencies: user and axiosSecure to trigger fetch when user info is available

    const handleUpdate = (property) => {
        // Redirect to update page with the property id
        navigate(`/dashboard/update-property/${property._id}`, { state: { property } });
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
  {properties.length === 0 && (
    <p className="text-center col-span-full dark:text-gray-300">No Properties Added by you</p>
  )}
  {properties.map((property) => (
    <div
      key={property._id}
      className="border rounded-lg p-4 shadow-lg dark:bg-[#1C1B1B] dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden rounded-md">
        <img
          src={property.imageUrl || 'fallback-image-url.jpg'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Verification Status Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold ${
            property.verificationStatus === 'verified'
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : property.verificationStatus === 'rejected'
              ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
          }`}
        >
          {property.verificationStatus}
        </div>
      </div>

      {/* Property Title */}
      <h3 className="text-xl font-semibold mt-4 dark:text-white">{property.title}</h3>

      {/* Property Location */}
      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
        <FaMapMarkerAlt className="mr-2" />
        <p>{property.location}</p>
      </div>

      {/* Price Range */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-lg font-medium dark:text-white">
          ${property.priceRange.min} - ${property.priceRange.max}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">Price Range</p>
      </div>

      {/* Agent Info */}
      <div className="mt-4 flex items-center">
        <img
          src={user.photoURL || 'fallback-agent-image-url.jpg'}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-medium dark:text-white">{user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Agent</p>
        </div>
      </div>

      {/* Update and Delete buttons */}
      <div className="mt-4 flex justify-between">
        {property.verificationStatus !== 'rejected' && (
          <button
            onClick={() => handleUpdate(property)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FaEdit className="mr-2" />
            Update
          </button>
        )}

        <button
          onClick={() => handleDelete(property._id)}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          <FaTrash className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    );
};

export default MyAddedProperties;
