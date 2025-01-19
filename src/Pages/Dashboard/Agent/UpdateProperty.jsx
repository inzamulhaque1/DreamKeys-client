import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For accessing state and navigating
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UpdateProperty = () => {
    const { state } = useLocation(); // Access the state passed from MyAddedProperties
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [property, setProperty] = useState({
        imageUrl: '',
        title: '',
        location: '',
        agentName: '', // Readonly field
        agentEmail: '', // Readonly field
        priceRange: {
            min: '',
            max: '',
        },
    });

    useEffect(() => {
        if (state && state.property) {
            setProperty(state.property);
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'minPrice' || name === 'maxPrice') {
            setProperty((prevProperty) => ({
                ...prevProperty,
                priceRange: {
                    ...prevProperty.priceRange,
                    [name === 'minPrice' ? 'min' : 'max']: value,
                },
            }));
        } else {
            setProperty((prevProperty) => ({
                ...prevProperty,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the property in the database
        axiosSecure.patch(`/properties/${property._id}`, property)
            .then(() => {
               
                navigate('/my-properties'); // Navigate back to the properties page after successful update
            })
            .catch((error) => {
                console.error('Error updating property:', error);
            });
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Update Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property Image */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium">Property Image</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={property.imageUrl}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Property Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Property Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={property.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Property Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium">Property Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={property.location}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Agent Name (readonly) */}
                <div>
                    <label htmlFor="agentName" className="block text-sm font-medium">Agent Name</label>
                    <input
                        type="text"
                        id="agentName"
                        name="agentName"
                        value={property.agentName}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-200"
                    />
                </div>

                {/* Agent Email (readonly) */}
                <div>
                    <label htmlFor="agentEmail" className="block text-sm font-medium">Agent Email</label>
                    <input
                        type="email"
                        id="agentEmail"
                        name="agentEmail"
                        value={property.agentEmail}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-200"
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium">Price Range</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={property.priceRange.min}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Min Price"
                        />
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={property.priceRange.max}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Max Price"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md"
                    >
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProperty;
