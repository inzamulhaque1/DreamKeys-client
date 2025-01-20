import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const PropertyBought = () => {
  const [bids, setBids] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

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


  const getRibbonColor = (offerStatus) => {
    const ribbonColors = {
      verified: "text-green-500",
      pending: "text-orange-500",
      rejected: "text-red-500",
    };
    return ribbonColors[offerStatus] || "text-blue-500"; // Default color for unknown statuses
  };

  const handlePayClick = (bidId, offerAmount) => {
    // Redirect to the payment page with the necessary data
    console.log(bidId, offerAmount);
    navigate("/payment", {
      state: { bidId, offerAmount },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties Bought</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bids?.map((bid, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <img
              src={bid?.imageUrl}
              alt={bid?.title}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{bid?.title}</h2>
            <p className="text-sm font-semibold mb-2">
                <span className="text-black font-bold">Status:</span>{" "}
                <span
                   className={`${getRibbonColor(
                    bid?.offerStatus
                  )} font-bold`}
                >{bid?.offerStatus}
                  
                </span>
              </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong> {bid?.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Agent:</strong> {bid?.agentName}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Offered Amount:</strong> ${bid?.offerAmount}
            </p>

            {
              bid?.offerStatus === 'accepted' && <Link to={'/dashboard/payment'}> <button
              className="btn btn-primary"
              onClick={() =>
                handlePayClick(bid?._id, bid?.offerAmount)
              }
            >
              PAY
            </button></Link>
            }
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
