import  { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MySoldProperties = () => {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {user} = useAuth()
  const agentEmail = user.email

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payments", {
          params: { agentEmail },
        });
        setPayments(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err, "Error fetching payment data.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, [agentEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Sold Properties</h1>
      {payments.length === 0 ? (
        <p>No properties sold by this agent.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Property Title</th>
              <th className="px-4 py-2 border">Buyer Email</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Amount (USD)</th>
              <th className="px-4 py-2 border">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-4 py-2 border">{payment.propertyTitle || "N/A"}</td>
                <td className="px-4 py-2 border">{payment.email}</td>
                <td className="px-4 py-2 border">{payment.transactionId}</td>
                <td className="px-4 py-2 border">${payment.price}</td>
                <td className="px-4 py-2 border">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MySoldProperties;
