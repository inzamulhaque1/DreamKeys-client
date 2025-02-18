/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaDollarSign, FaHome, FaChartLine, FaCalendarAlt, FaUser } from "react-icons/fa"; // React Icons for better visuals
import useAuth from "../../../hooks/useAuth";

const SellingStatistics = ({ theme }) => {
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
        setError(err.message || "Error fetching payment data.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, [agentEmail]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  // Format data for the chart
  const chartData = payments.map((payment) => ({
    property: payment.propertyTitle || "N/A",
    price: payment.price,
  }));

  // Calculate stats
  const totalPropertiesSold = payments.length;
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.price, 0);
  const averageRevenuePerProperty = totalRevenue / totalPropertiesSold || 0;

  return (
    <div className="p-4 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Selling Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:from-green-800 dark:to-green-900">
          <div className="flex items-center">
            <FaHome className="text-3xl text-green-600 dark:text-green-300 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-100">Total Properties Sold</h2>
              <p className="text-2xl font-bold text-green-900 dark:text-green-50">{totalPropertiesSold}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:from-blue-800 dark:to-blue-900">
          <div className="flex items-center">
            <FaDollarSign className="text-3xl text-blue-600 dark:text-blue-300 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-100">Total Revenue</h2>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-50">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:from-purple-800 dark:to-purple-900">
          <div className="flex items-center">
            <FaChartLine className="text-3xl text-purple-600 dark:text-purple-300 mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-100">Average Revenue</h2>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-50">${averageRevenuePerProperty.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      {payments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">No properties sold by this agent.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Revenue by Property</h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4b5563' : '#e5e7eb'} />
                <XAxis dataKey="property" stroke={theme === 'dark' ? '#ffffff' : '#000000'} />
                <YAxis stroke={theme === 'dark' ? '#ffffff' : '#000000'} />
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#374151' : '#ffffff', borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb' }} />
                <Bar dataKey="price" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Transactions Table */}
      {payments.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <FaHome className="mr-2" />
                      Property Title
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      Buyer Email
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <FaDollarSign className="mr-2" />
                      Amount (USD)
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
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
        </div>
      )}
    </div>
  );
};

export default SellingStatistics;