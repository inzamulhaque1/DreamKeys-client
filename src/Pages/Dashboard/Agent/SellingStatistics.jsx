import  { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useAuth from "../../../hooks/useAuth";

const SellingStatistics = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const agentEmail = user.email;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payments", {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Format data for the chart
  const chartData = payments.map((payment) => ({
    property: payment.propertyTitle || "N/A",
    price: payment.price,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Selling Statistics</h1>
      {payments.length === 0 ? (
        <p>No properties sold by this agent.</p>
      ) : (
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="property" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SellingStatistics;
