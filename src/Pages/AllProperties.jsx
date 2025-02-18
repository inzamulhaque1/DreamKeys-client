import { useState, useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Search, DollarSign, MapPin, ShieldCheck, User } from "lucide-react";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [searchQuery, setSearchQuery] = useState(""); // For location search
  
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch properties
  useEffect(() => {
    axiosSecure.get("/properties").then((response) => {
      setProperties(response.data);
      setFilteredProperties(response.data);
      setLoading(false);
    });
  }, [axiosSecure]);

  // Filter properties based on price range and location search
  useEffect(() => {
    const filtered = properties.filter(
      (property) =>
        property.priceRange.min >= minPrice &&
        property.priceRange.max <= maxPrice &&
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [minPrice, maxPrice, properties, searchQuery]);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading properties...</div>;
  }

  const getRibbonColor = (status) => {
    const ribbonColors = {
      verified: "text-green-500",
      pending: "text-yellow-500",
      rejected: "text-red-500",
    };
    return ribbonColors[status] || "text-blue-500";
  };

  return (
    <div className="p-6 w-10/12 mx-auto sm:p-8 dark:bg-gray-900 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold dark:text-white text-gray-900">All Properties</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Find your dream home with ease.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Location Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border p-2 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Price Range Filter */}
        <div className="flex gap-4 w-full md:w-2/3">
          <div className="relative w-1/2">
            <DollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="pl-10 border p-2 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="relative w-1/2">
            <DollarSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="pl-10 border p-2 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="relative border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-transform transform hover:scale-105"
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
              <h2 className="text-lg font-bold mb-2 dark:text-white text-gray-900 truncate">
                {property.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
                <MapPin className="text-blue-500" /> {property.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
                <User className="text-purple-500" /> {property.agentName}
              </p>
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="text-green-500" />
                <span className={`${getRibbonColor(property.verificationStatus)} font-bold`}>
                  {property.verificationStatus}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <DollarSign className="text-yellow-500" />
                ${property.priceRange.min} - ${property.priceRange.max}
              </p>
            </div>

            {/* CTA Button */}
            <div className="p-4 border-t bg-gray-50 dark:bg-gray-700">
              <button
                onClick={() => navigate(`/property-details/${property._id}`)}
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
