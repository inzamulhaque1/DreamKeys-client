import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Make an Offer</h1>
      <form onSubmit={handleOfferSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">
            Property Location
          </label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Price Range</label>
          <p>
            ${property?.priceRange?.min} - ${property?.priceRange?.max}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold">Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            min={property.priceRange.min}
            max={property.priceRange.max}
            required
          />
          {error && <p className="text-red-600">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold">Buyer Name</label>
          <input
            type="text"
            value={user?.displayName} // Display the logged-in user's name
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Buyer Email</label>
          <input
            type="email"
            value={user?.email} // Display the logged-in user's email
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-4"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
