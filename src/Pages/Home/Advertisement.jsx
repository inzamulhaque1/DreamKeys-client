import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Advertisement = () => {
    const [properties, setProperties] = useState([]);
    const axiosSecure = useAxiosSecure(); // Custom hook for secure axios requests
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all properties
        axiosSecure.get('/properties')
            .then(({ data }) => {
                setProperties(data);
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
            });
    }, [axiosSecure]);

    const advProperties = properties
    .filter(property => property.isAdvertised === true) // Filter advertised properties
    .sort((a, b) => {
        // Fallback to createdAt if updatedAt is missing
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA; // Sort descending by date
    })
    .slice(0, 4); // Select the top 4 from the sorted array

    const handleViewDetails = (propertyId) => {
        navigate(`/property-details/${propertyId}`);
    };

    return (
        <div className="p-6 w-9/12 mx-auto">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">Featured Advertisements</h1>
                <p className="text-lg text-gray-600 mt-2">Explore the latest advertised properties curated just for you!</p>
            </div>

            {advProperties.length === 0 ? (
                <p className="text-center text-gray-500">No properties are currently advertised.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advProperties.map(property => (
                        <div 
                            key={property._id} 
                            className="border p-4 shadow-lg rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:bg-sky-50"
                        >
                            <img 
                                src={property.imageUrl} 
                                alt={property.title} 
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-bold text-lg text-gray-800">{property.title}</h3>
                            <p className="text-gray-600 flex items-center mt-2">
                                <FaMapMarkerAlt className="mr-2 text-red-500" />
                                {property.location}
                            </p>
                            <p className="text-green-600 mt-1 font-semibold">
                                ${property.priceRange.min} - ${property.priceRange.max}
                            </p>
                            <p 
                                className={`text-sm mt-1 flex items-center ${property.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {property.verificationStatus === 'verified' ? (
                                    <FaRegCheckCircle className="mr-2" />
                                ) : (
                                    <FaTimesCircle className="mr-2" />
                                )}
                                {property.verificationStatus}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => handleViewDetails(property._id)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Advertisement;
