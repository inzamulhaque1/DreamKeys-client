import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestedProperties = () => {
  const [offers, setOffers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch offers for properties added by the agent
    axiosSecure
      .get("/agent/properties/offers")
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, [axiosSecure]);

  const handleAccept = async (offerId, propertyId) => {
    try {
      await axiosSecure.patch(`/agent/offers/${offerId}/accept`, { propertyId });
      // Refresh offers after status change
      const { data } = await axiosSecure.get("/agent/properties/offers");
      setOffers(data);
    } catch (error) {
      console.error("Error accepting offer:", error);
    }
  };

  const handleReject = async (offerId) => {
    try {
      await axiosSecure.patch(`/agent/offers/${offerId}/reject`);
      // Refresh offers after status change
      const { data } = await axiosSecure.get("/agent/properties/offers");
      setOffers(data);
    } catch (error) {
      console.error("Error rejecting offer:", error);
    }
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
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="border border-gray-300 px-4 py-2">{offer.propertyTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.propertyLocation}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{offer.buyerName}</td>
                <td className="border border-gray-300 px-4 py-2">${offer.offeredPrice}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`font-semibold ${
                      offer.status === "pending"
                        ? "text-yellow-500"
                        : offer.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {offer.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(offer._id, offer.propertyId)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(offer._id)}
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
