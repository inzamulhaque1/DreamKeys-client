import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"; // Import Recharts components
import {  FaMoneyBillWave } from "react-icons/fa"; // Icons for stats
import { FaChartLine, FaChartPie } from "react-icons/fa"; // Icons for stats

const UserStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [payments, setPayments] = useState([]);
  const [bids, setBids] = useState([]);

  // Fetch user reviews
  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/reviews/user/${user.uid}`)
        .then((response) => {
          setUserReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user reviews:", error);
        });
    }
  }, [user, axiosSecure]);

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

  // Data for total spending
  const totalSpending = payments.reduce(
    (total, payment) => total + payment.price,
    0
  );

  // Data for payment trends over time
  const paymentTrendsData = payments.map((payment) => ({
    date: new Date(payment.date).toLocaleDateString(),
    amount: payment.price,
  }));

  // Data for payment distribution by property
  const paymentDistributionByProperty = payments.reduce((acc, payment) => {
    if (!acc[payment.propertyTitle]) {
      acc[payment.propertyTitle] = 0;
    }
    acc[payment.propertyTitle] += payment.price;
    return acc;
  }, {});

  const paymentDistributionData = Object.keys(
    paymentDistributionByProperty
  ).map((property) => ({
    name: property,
    value: paymentDistributionByProperty[property],
  }));

  // Data for bar chart (reviews by status)
  const reviewStatusData = [
    {
      name: "Approved",
      value: userReviews.filter((r) => r.reviewStatus === "approved").length,
    },
    {
      name: "Pending",
      value: userReviews.filter((r) => r.reviewStatus === "pending").length,
    },
    {
      name: "Rejected",
      value: userReviews.filter((r) => r.reviewStatus === "rejected").length,
    },
  ];


  // Data for bar chart (bids by status)
  const bidStatusData = [
    {
      name: "Accepted",
      value: bids.filter((b) => b.offerStatus === "accepted").length,
    },
    {
      name: "Pending",
      value: bids.filter((b) => b.offerStatus === "pending").length,
    },
    {
      name: "Rejected",
      value: bids.filter((b) => b.offerStatus === "rejected").length,
    },
  ];

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Statistics</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <FaMoneyBillWave className="text-blue-500 dark:text-blue-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Total Spending</h3>
            <p className="text-2xl font-bold">
              ${totalSpending.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full">
            <FaChartLine className="text-green-500 dark:text-green-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Total Payments</h3>
            <p className="text-2xl font-bold">{payments.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-full">
            <FaChartPie className="text-purple-500 dark:text-purple-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Properties Paid For</h3>
            <p className="text-2xl font-bold">
              {paymentDistributionData.length}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Line Chart: Payment Trends Over Time */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Payment Trends Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paymentTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Payment Distribution by Property */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Payment Distribution by Property
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {paymentDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Reviews by Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Reviews by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reviewStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        {/* Bar Chart: Bids by Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Bids by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bidStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};

export default UserStats;
