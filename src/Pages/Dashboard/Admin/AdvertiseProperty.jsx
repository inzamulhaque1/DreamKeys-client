import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdvertiseProperty = () => {
    const [properties, setProperties] = useState([]); // Holds all properties
    const axiosSecure = useAxiosSecure(); // Custom hook for secure axios requests

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

    // Filter properties for "verified" status
    const verifiedProperties = properties.filter(
        (property) => property.verificationStatus === 'verified'
    );

    const handleAdvertise = (propertyId) => {
        // Make API request to advertise the property
        axiosSecure.patch(`/properties/${propertyId}/advertise`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                // Update the local state to reflect the advertised property
                setProperties(prevProperties =>
                    prevProperties.map(property =>
                        property._id === propertyId
                            ? { ...property, isAdvertised: true }
                            : property
                    )
                );
            })
            .catch(error => {
                console.error("Error advertising property:", error);
            });
    };

    const handleRemoveAdvertise = (propertyId) => {
        // Make API request to remove advertisement
        axiosSecure.patch(`/properties/${propertyId}/remove-advertise`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                // Update the local state to reflect the removed advertisement
                setProperties(prevProperties =>
                    prevProperties.map(property =>
                        property._id === propertyId
                            ? { ...property, isAdvertised: false }
                            : property
                    )
                );
            })
            .catch(error => {
                console.error("Error removing advertisement:", error);
            });
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-[#0B0716]">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Verified Properties</h1>
            {verifiedProperties.length === 0 ? (
                <p className="text-gray-700 dark:text-white">No verified properties found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-white">Image</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-white">Property Title</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-white">Price Range</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-white">Agent Name</th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900">
                        {verifiedProperties.map((property) => (
                            <tr key={property._id}>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    <img 
                                        src={property.imageUrl} 
                                        alt={property.title} 
                                        className="w-20 h-20 object-cover rounded-lg" 
                                    />
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-white">{property.title}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-white">${property.priceRange.min} - ${property.priceRange.max}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-white">{property.agentName}</td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                    {property.isAdvertised ? (
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            onClick={() => handleRemoveAdvertise(property._id)}
                                        >
                                            Remove Advertise
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                            onClick={() => handleAdvertise(property._id)}
                                        >
                                            Advertise
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdvertiseProperty;
