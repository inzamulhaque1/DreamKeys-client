import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const [searchQuery, setSearchQuery] = useState(''); // For location search
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch properties
  useEffect(() => {
    axiosSecure.get("/properties").then((response) => {
      setProperties(response.data);
      setFilteredProperties(response.data); // Set filtered properties to all initially
      setLoading(false);
    });
  }, [axiosSecure]);

  // Filter properties based on price range and location search
  useEffect(() => {
    const filtered = properties.filter(
      (property) =>
        property.priceRange.min >= minPrice &&
        property.priceRange.max <= maxPrice &&
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by location
    );
    setFilteredProperties(filtered);
  }, [minPrice, maxPrice, properties, searchQuery]);



  if (loading) {
    return <div>Loading properties...</div>;
  }

  // Helper function to determine text background color based on verification status
  const getRibbonColor = (status) => {
    const ribbonColors = {
      verified: "text-green-500",
      pending: "text-yellow-500",
      rejected: "text-red-500",
    };
    return ribbonColors[status] || "text-blue-500"; // Default color for unknown statuses
  };

  // Function to navigate to property details page
  const handleViewDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`); // Navigate to the PropertyDetails page
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Properties</h1>

      {/* Location Search */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Search by Location</h2>
        <input
          type="text"
          placeholder="Search by location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-96 mb-4"
        />
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded-lg w-32"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded-lg w-32"
            />
          </div>
        </div>
      </div>

      

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="relative border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            {/* Property Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-gray-800 truncate">
                {property.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {property.location}
              </p>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                <img
                  src={property.agentImageUrl}
                  alt={property.agentName}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span>{property.agentName}</span>
              </p>
              <p className="text-sm font-semibold mb-2">
                <span className="text-black">Verification:</span>{" "}
                <span
                  className={`${getRibbonColor(
                    property.verificationStatus
                  )} font-bold`}
                >
                  {property.verificationStatus}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Price Range:</span> $ 
                {property.priceRange.min} - ${property.priceRange.max}
              </p>
            </div>

            {/* CTA Button */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => handleViewDetails(property._id)}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
