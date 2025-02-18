import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUserTie, FaMoneyBillWave, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const PropertyBought = () => {
  const [bids, setBids] = useState(null);
  const [payments, setPayments] = useState(null); // To store payment data
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch bids data
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/bids/${user?.email}`)
        .then((response) => {
          setBids(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bids:", error);
        });
    }
  }, [axiosSecure, user]);

  // Fetch payment data for the user
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/payments/${user?.email}`)
        .then((response) => {
          setPayments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [axiosSecure, user]);

  const getRibbonColor = (offerStatus) => {
    const ribbonColors = {
      verified: "bg-green-500 dark:bg-green-600",
      pending: "bg-orange-500 dark:bg-orange-600",
      rejected: "bg-red-500 dark:bg-red-600",
    };
    return ribbonColors[offerStatus] || "bg-blue-500 dark:bg-blue-600"; // Default color for unknown statuses
  };

  const getStatusIcon = (offerStatus) => {
    const statusIcons = {
      verified: <FaCheckCircle className="text-green-500 dark:text-green-400" />,
      pending: <FaClock className="text-orange-500 dark:text-orange-400" />,
      rejected: <FaTimesCircle className="text-red-500 dark:text-red-400" />,
    };
    return statusIcons[offerStatus] || <FaCheckCircle className="text-blue-500 dark:text-blue-400" />;
  };

  // Function to check if the bid is paid
  const isPaid = (bidId) => {
    return payments?.some((payment) => payment.bidId === bidId); // Check if payment exists for this bid
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Properties Bought
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {bids?.map((bid, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={bid?.imageUrl}
                alt={bid?.title}
                className="h-48 w-full object-cover"
              />
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm text-white ${getRibbonColor(
                  bid?.offerStatus
                )}`}
              >
                <div className="flex items-center gap-1">
                  {getStatusIcon(bid?.offerStatus)}
                  <span>{bid?.offerStatus}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
                {bid?.title}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{bid?.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaUserTie className="mr-2" />
                  <span>{bid?.agentName}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaMoneyBillWave className="mr-2" />
                  <span>${bid?.offerAmount}</span>
                </div>
              </div>
              <div className="mt-6">
                {isPaid(bid._id) ? (
                  <div className="flex items-center justify-between bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-300 font-bold">
                      Transaction ID:{" "}
                      {payments.find((payment) => payment.bidId === bid._id)
                        ?.transactionId}
                    </p>
                    <FaCheckCircle className="text-green-500 dark:text-green-400" />
                  </div>
                ) : (
                  bid?.offerStatus === "accepted" && (
                    <Link to={`/dashboard/payment/${bid._id}`}>
                      <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                        <FaMoneyBillWave className="mr-2" />
                        PAY NOW
                      </button>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;