import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { FaUsers, FaHome, FaStar, FaHeart, FaGavel, FaDollarSign } from 'react-icons/fa'; // React Icons
import { motion } from 'framer-motion'; // For animations
const AdminStats = () => {
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure
      .get("/wishlists")
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [axiosSecure]);

  const { data: bids = [] } = useQuery({
    queryKey: ["bids"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bidss");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/paymentss");
      return res.data;
    },
  });

  const totalUsers = users.length;
  const totalProperties = properties.length;
  const totalReviews = reviews.length;
  const totalWishlist = wishlist.length;
  const totalBids = bids.length;
  const totalSales = payments.reduce((sum, payment) => sum + (payment.price || 0), 0);

  const propertyStatusData = [
    { name: 'Verified', value: properties.filter(p => p.verificationStatus === 'verified').length },
    { name: 'Pending', value: properties.filter(p => p.verificationStatus === 'pending').length },
    { name: 'Rejected', value: properties.filter(p => p.verificationStatus === 'rejected').length }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const userRolesData = [
    { role: 'Admin', count: users.filter(u => u.role === 'admin').length },
    { role: 'Agent', count: users.filter(u => u.role === 'agent').length },
    { role: 'User', count: users.filter(u => u.role === 'user').length }
  ];

  // Data for Total Sales Angle Graph (Line Chart)
  const salesData = payments.map((payment, index) => ({
    name: `Payment ${index + 1}`,
    amount: payment.price || 0,
  }));

  // Define cartData for the Total Bids and Sales Summary Bar Chart
  const cartData = [
    {
      category: 'Summary',
      bids: totalBids,
      wishlist: totalWishlist,
      reviews: totalReviews,
    }
  ];

  return (
    <div className="p-4 space-y-6 dark:bg-[#0B0716] dark:text-white">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Users Card */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Hover animation
          transition={{ duration: 0.3 }} // Animation duration
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</h3>
            <FaUsers className="text-2xl text-blue-500 dark:text-blue-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers}</div>
        </motion.div>

        {/* Total Properties Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Properties</h3>
            <FaHome className="text-2xl text-green-500 dark:text-green-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalProperties}</div>
        </motion.div>

        {/* Total Reviews Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Reviews</h3>
            <FaStar className="text-2xl text-yellow-500 dark:text-yellow-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalReviews}</div>
        </motion.div>

        {/* Wishlist Items Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Wishlist Items</h3>
            <FaHeart className="text-2xl text-red-500 dark:text-red-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalWishlist}</div>
        </motion.div>

        {/* Total Bids Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Bids</h3>
            <FaGavel className="text-2xl text-purple-500 dark:text-purple-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalBids}</div>
        </motion.div>

        {/* Total Sales Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Sales</h3>
            <FaDollarSign className="text-2xl text-green-500 dark:text-green-400" /> {/* React Icon */}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalSales.toLocaleString()}</div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Property Status Pie Chart */}
        <div className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4">

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Property Status Distribution</h3>
          </div>
          
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {propertyStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles Bar Chart */}
        <div className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Role Distribution</h3>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userRolesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Sales Angle Graph (Line Chart) */}
        <div className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 ">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Sales Over Time: ${totalSales.toLocaleString()}</h3>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Bids and Sales Summary (Bar Chart) */}
        <div className="bg-white dark:bg-[#1C1B1B] rounded-lg shadow p-4 ">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Bids and Sales Summary</h3>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bids" fill="#8884d8" />
                <Bar dataKey="wishlist" fill="#82ca9d" />
                <Bar dataKey="reviews" fill="#ff6f61" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default AdminStats;
