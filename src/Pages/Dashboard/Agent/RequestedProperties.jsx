import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCheckCircle, FaTimesCircle, FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'; // React Icons for better visuals

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
        console.log("all data" , response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, [axiosSecure, userEmail]);

  const handleAccept = (bidId) => {
    axiosSecure
      .patch(`/bids/${bidId}`, { status: 'accepted' })
      .then((response) => {
        
        console.log("Bid accepted:", response.data);
        
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

    <div className="p-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Requested/Offered Properties</h1>
      {offers.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No offers available at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Property Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Buyer Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Buyer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Offered Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Offered Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700">
              {offers.map((offer, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {offer.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500 dark:text-gray-300" />
                      {offer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2 text-gray-500 dark:text-gray-300" />
                      {offer.buyerEmail || 'NA'}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-gray-500 dark:text-gray-300" />
                      {offer.buyerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    ${offer.offerAmount}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-500 dark:text-gray-300" />
                      {offer.buyingDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
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
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {offer.offerStatus === "pending" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAccept(offer._id)}
                          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                          <FaCheckCircle className="mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject()}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                          <FaTimesCircle className="mr-2" />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  );
};

export default RequestedProperties;
