import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users data using useQuery
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle role updates (Make Admin/Agent)
  const handleUpdateRole = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}/role`, { role: newRole })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Success!", res.data.message, "success");
          refetch();
        }
      })
      .catch((error) => {
        Swal.fire("Error!", error.response?.data?.message || error.message, "error");
      });
  };

  // Mark user as fraud and delete their properties
  const handleMarkAsFraud = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the agent as fraud and delete all their properties.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${userId}/fraud`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Marked as Fraud!", "The user has been marked as fraud.", "success");
              axiosSecure.delete(`/properties/agent/${userId}`).then(() => {
                refetch();
              }).catch(() => {
                Swal.fire("Error!", "Failed to remove agent's properties.", "error");
              });
            }
          })
          .catch((error) => {
            Swal.fire("Error!", error.response?.data?.message || error.message, "error");
          });
      }
    });
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire("Error!", error.response?.data?.message || error.message, "error");
          });
      }
    });
  };

  return (
    <div className="p-4 dark:bg-[#0B0716] bg-white">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2 text-left text-black dark:text-white">#</th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">Image</th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">Name</th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">Email</th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">Role</th>
              <th className="border px-4 py-2 text-left text-black dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border px-4 py-2 text-black dark:text-white">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/50"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2 text-black dark:text-white">{user.name || "N/A"}</td>
                <td className="border px-4 py-2 text-black dark:text-white">{user.email}</td>
                <td className="border px-4 py-2 text-black dark:text-white">
                  {user.isFraud ? (
                    <span className="text-red-500 font-bold">Fraud</span>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border px-4 py-2 space-x-2 flex flex-wrap">
                  {user.isFraud ? (
                    <span className="text-gray-500">No Actions Available</span>
                  ) : (
                    <>
                      {user.role !== "admin" && (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600 transition"
                          onClick={() => handleUpdateRole(user._id, "admin")}
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role !== "agent" && (
                        <button
                          className="bg-green-500 text-white px-3 py-1 text-xs rounded hover:bg-green-600 transition"
                          onClick={() => handleUpdateRole(user._id, "agent")}
                        >
                          Make Agent
                        </button>
                      )}
                      {user.role === "agent" && (
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 text-xs rounded hover:bg-yellow-600 transition"
                          onClick={() => handleMarkAsFraud(user._id)}
                        >
                          Mark as Fraud
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
