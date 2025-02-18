import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Ensure this is imported correctly

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const axiosSecure = useAxiosSecure(); // Custom hook for secure axios requests

    useEffect(() => {
        // Fetch all properties that need to be verified or rejected
        axiosSecure.get('/properties')
            .then(({ data }) => {  // Destructure data directly from the response
                setProperties(data);
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
            });
    }, [axiosSecure]);

    const handleAction = async (propertyId, action) => {
        try {
            // Define the verification status based on the action
            const verificationStatus = action === 'verify' ? 'verified' : 'rejected';
    
            // Make the API call for approve or reject with verificationStatus in the body
            await axiosSecure.patch(`/properties/${propertyId}/verify`, { verificationStatus });
    
            // Show SweetAlert based on the action
            Swal.fire({
                title: action === 'verify' ? 'Approved!' : 'Rejected!',
                text: `The property has been ${action === 'verify' ? 'verified' : 'rejected'} successfully.`,
                icon: action === 'verify' ? 'success' : 'error',
                confirmButtonText: 'Okay'
            });
    
            // Update the local state to reflect the new status
            const updatedProperties = properties.map(property =>
                property._id === propertyId
                    ? { ...property, verificationStatus: verificationStatus }
                    : property
            );
            setProperties(updatedProperties);
    
        } catch (error) {
            console.error(`Error ${action} property:`, error);
            Swal.fire({
                title: 'Error!',
                text: `There was an error ${action === 'verify' ? 'approving' : 'rejecting'} the property.`,
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0B0716] p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Properties</h1>
            <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-200 dark:bg-gray-800">
                    <tr>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Property Title</th>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Location</th>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Agent Name</th>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Agent Email</th>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Price Range</th>
                        <th className="border p-2 text-left text-gray-700 dark:text-white">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900">
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td className="border p-2 text-gray-800 dark:text-white">{property.title}</td>
                            <td className="border p-2 text-gray-800 dark:text-white">{property.location}</td>
                            <td className="border p-2 text-gray-800 dark:text-white">{property.agentName}</td>
                            <td className="border p-2 text-gray-800 dark:text-white">{property.agentEmail}</td>
                            <td className="border p-2 text-gray-800 dark:text-white">
                                ${property.priceRange.min} - ${property.priceRange.max}
                            </td>
                            <td className="border p-2">
                                {property.verificationStatus === 'pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleAction(property._id, 'verify')}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(property._id, 'reject')}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : property.verificationStatus === 'verified' ? (
                                    <span className="text-green-500">Approved</span>
                                ) : (
                                    <span className="text-red-500">Rejected</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;
