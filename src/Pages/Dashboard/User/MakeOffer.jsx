import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaHome, FaMapMarkerAlt, FaUser, FaDollarSign, FaCalendarAlt } from "react-icons/fa"; // React Icons for better visuals

const MakeOffer = () => {
  const { id } = useParams(); // Get property id from the URL
  const [property, setProperty] = useState(null);
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user data

  useEffect(() => {
    // Fetch property details based on the id from the URL
    axiosSecure
      .get(`/wishlist/${id}`)
      .then((response) => {
        setProperty(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [id, axiosSecure]);

  const handleOfferSubmit = (e) => {
    e.preventDefault();
  
    // Convert offerAmount to a number
    const numericOfferAmount = parseFloat(offerAmount);
  
    // Ensure offer amount is within the specified range
    if (numericOfferAmount < property.priceRange.min || numericOfferAmount > property.priceRange.max) {
      setError(
        `Offer amount must be between $${property.priceRange.min} and $${property.priceRange.max}`
      );
      return;
    }
  
    // Make an offer (you can send the offer data to your API here)

    
    axiosSecure
      .post("/bids", {
        propertyId: property?.propertyId,
        propertyTitle: property?.title,
        offerAmount: numericOfferAmount,
        agentEmail: property.agentEmail,
        buyerName: user?.displayName, 
        buyerEmail: user?.email, 
        buyingDate,
      })
      .then(() => {
        Swal.fire({
          title: "Offer Submitted!",
          text: "Your offer has been successfully submitted.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/wishlist"); // Navigate after SweetAlert closes
        });
      })
      .catch((error) => {
        console.error("Error submitting the offer:", error);
      });
  };
  

  if (!property) {
    return <div>Loading property details...</div>;
  }

  return (
    <div className="p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Make an Offer</h1>
      <form onSubmit={handleOfferSubmit} className="space-y-6">
        {/* Property Title */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaHome className="inline-block mr-2" />
            Property Title
          </label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Property Location */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaMapMarkerAlt className="inline-block mr-2" />
            Property Location
          </label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaUser className="inline-block mr-2" />
            Agent Name
          </label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaDollarSign className="inline-block mr-2" />
            Price Range
          </label>
          <p className="text-gray-600 dark:text-gray-300">
            ${property?.priceRange?.min} - ${property?.priceRange?.max}
          </p>
        </div>

        {/* Offer Amount */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaDollarSign className="inline-block mr-2" />
            Offer Amount
          </label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            min={property.priceRange.min}
            max={property.priceRange.max}
            required
          />
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        </div>

        {/* Buyer Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaUser className="inline-block mr-2" />
            Buyer Name
          </label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Buyer Email */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaUser className="inline-block mr-2" />
            Buyer Email
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Buying Date */}
        <div>
          <label className="block text-sm font-semibold mb-2 dark:text-gray-300">
            <FaCalendarAlt className="inline-block mr-2" />
            Buying Date
          </label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
