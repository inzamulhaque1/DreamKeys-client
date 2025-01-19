import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RequestedProperties = () => {
  const [offers, setOffers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;

  useEffect(() => {
    // Fetch offers for properties added by the agent
    axiosSecure
      .get(`/agentBids/${userEmail}`)
      .then((response) => {
        setOffers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, [axiosSecure, userEmail]);

  const handleAccept = (bidId) => {
    axiosSecure
      .patch(`/bids/${bidId}`, { status: 'accepted' })
      .then((response) => {
        // Handle success (optional)
        console.log("Bid accepted:", response.data);
        // Optionally, update the local state to reflect the change
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer._id === bidId ? { ...offer, offerStatus: 'accepted' } : offer
          )
        );
      })
      .catch((error) => {
        console.error("Error updating bid status:", error);
      });
  };
  

  


  
  const handleReject = () => {
    
  };
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Requested/Offered Properties</h1>
      {offers.length === 0 ? (
        <p>No offers available at the moment.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Email</th>
              <th className="border border-gray-300 px-4 py-2">Buyer Name</th>
              <th className="border border-gray-300 px-4 py-2">Offered Price</th>
              <th className="border border-gray-300 px-4 py-2">Offered propertyId</th>
              <th className="border border-gray-300 px-4 py-2">Offered _id</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-4 py-2">{offer.title}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.location}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerName}</td>
                <td className="border border-gray-300 px-4 py-2">${offer.offerAmount}</td>
                <td className="border border-gray-300 px-4 py-2">${offer.propertyId}</td>
                <td className="border border-gray-300 px-4 py-2">${offer._id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`font-semibold ${
                      offer.offerStatus === "pending"
                        ? "text-yellow-500"
                        : offer.offerStatus === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {offer.offerStatus}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.offerStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(offer._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject()}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
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

export default RequestedProperties;
