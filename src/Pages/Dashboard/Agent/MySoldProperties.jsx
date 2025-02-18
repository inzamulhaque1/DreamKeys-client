import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

import { FaDollarSign, FaHome, FaEnvelope, FaIdCard, FaCalendarAlt } from 'react-icons/fa'; // React Icons for better visuals

const MySoldProperties = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const agentEmail = user.email;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://assignment12-server-phi.vercel.app/payments", {
          params: { agentEmail },
        });
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err, "Error fetching payment data.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, [agentEmail]);

  const totalAmount = payments.reduce((sum, payment) => sum + (payment.price || 0), 0);
  const totalProperties = payments.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (

    <div className="p-4 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">My Sold Properties</h1>
    
      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:from-green-800 dark:to-green-900">
          <div className="flex items-center">
            <FaHome className="text-3xl text-green-600 dark:text-green-300 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-100">Total Properties Sold</h2>
              <p className="text-2xl font-bold text-green-900 dark:text-green-50">{totalProperties}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:from-blue-800 dark:to-blue-900">
          <div className="flex items-center">
            <FaDollarSign className="text-3xl text-blue-600 dark:text-blue-300 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-100">Total Amount</h2>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    
      {/* Payments Table */}
      {payments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No properties sold by this agent.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <FaHome className="mr-2" />
                    Property Title
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2" />
                    Buyer Email
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <FaIdCard className="mr-2" />
                    Transaction ID
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2" />
                    Amount (USD)
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Payment Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700">
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {payment.propertyTitle || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {payment.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    ${payment.price}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                    {new Date(payment.date).toLocaleDateString()}
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

export default MySoldProperties;
