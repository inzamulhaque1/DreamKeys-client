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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Verified Properties</h1>
            {verifiedProperties.length === 0 ? (
                <p>No verified properties found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Property Title</th>
                            <th className="border border-gray-300 px-4 py-2">Price Range</th>
                            <th className="border border-gray-300 px-4 py-2">Agent Name</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifiedProperties.map((property) => (
                            <tr key={property._id}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img 
                                        src={property.imageUrl} 
                                        alt={property.title} 
                                        className="w-20 h-20 object-cover" 
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{property.title}</td>
                                <td className="border border-gray-300 px-4 py-2">${property.priceRange.min} - ${property.priceRange.max}</td>
                                <td className="border border-gray-300 px-4 py-2">{property.agentName}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {property.isAdvertised ? (
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveAdvertise(property._id)}
                                        >
                                            Remove Advertise
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
