import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const PropertyBought = () => {
  const [bids, setBids] = useState(null);
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()



  // Fetch bids data
  useEffect(() => {
    if (user){
      axiosSecure
      .get(`/bids/${user?.email}`)
      .then((response) => {
        setBids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      })
      
    }

  }, [axiosSecure, user])

  console.log(bids);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties Bought</h1>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Property Location</th>
              <th className="border border-gray-300 px-4 py-2">Property Title</th>
              <th className="border border-gray-300 px-4 py-2">Property Image</th>
              <th className="border border-gray-300 px-4 py-2">Agent Name</th>
              <th className="border border-gray-300 px-4 py-2">Offered Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((bid, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{bid?.location}</td>
                <td className="border border-gray-300 px-4 py-2">{bid?.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={bid?.imageUrl} alt={bid?.title} className="h-16 w-16 object-cover" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{bid?.agentName}</td>
                <td className="border border-gray-300 px-4 py-2">${bid?.offerAmount}</td>
                <td className="border border-gray-300 px-4 py-2">{bid?.offerStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
};

export default PropertyBought;
