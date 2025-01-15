import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/lottie/home.json";
import { IoLogOut } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHeart, FaUser } from "react-icons/fa";
import { SiBookmyshow } from "react-icons/si";
import { MdOutlineReviews } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import useAxiosPublic from "../hooks/useAxiosPublic";



const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const axiosPublic = useAxiosPublic()


  useEffect(() => {
    if (user && user.email) { // Ensure `user` is not null
      const userEmail = user.email;
      axiosPublic
        .get("/users/role", { params: { email: userEmail } })
        .then((response) => {
          setUserRole(response.data.role); // Update the state with the role
          console.log("User Role:", response.data.role);
        })
        .catch((error) => console.error("Error fetching user role:", error));
    }
  }, [axiosPublic, user]);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  const signOut = () => {
    logOut();
    navigate("/");
  };



  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div>
      <div className="h-[100px] w-full  flex items-center bg-[#143D3A] justify-between px-6 shadow-md">
        {/* Logo */}
        <div className="flex justify-center p-5">
          <Link to={"/"}>
            <div className="flex justify-end items-center">
              <div className="flex justify-center items-center h-screen">
                <Player
                  autoplay
                  loop
                  src={animationData}
                  style={{ height: "80px", width: "80px" }}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Greeting Section */}
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">
            Hi {user?.displayName || "Guest User"}, {greeting}!
          </p>
          <p className="text-lg font-light text-white">
            Welcome to your Dashboard
          </p>
        </div>

        {/* User Info Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name */}
          <div className="text-white">
            <p className="text-lg font-medium">
              {user?.displayName || "Guest User"}
            </p>
            {user?.email && <p className="text-sm font-light">{user.email}</p>}
          </div>
        </div>
      </div>

      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between`}
        >
          {/* Top Section */}
          <div>
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="bg-gray-700 w-full text-4xl text-white p-2 focus:outline-none"
            >
              {isSidebarOpen ? (
                <MdOutlineDashboardCustomize />
              ) : (
                <LuLayoutDashboard />
              )}
            </button>

            {/* Sidebar Content */}

            <div className="mt-4 p-4">
              <ul>
                {/* Admin Buttons */}

                {userRole === "admin" && (
                  <>
                    <NavLink
                      to={"all-users"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">All Users</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>

                    <NavLink
                      to={"admin-profile"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Admin Profile</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>

                    <NavLink
                      to={"manage-properties"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Manage Properties</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>

                    <NavLink
                      to={"manage-reviews"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Manage Reviews</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>
                    
                  </>
                )}

                {/* Agent Buttons */}
                {userRole === "agent" && (
                  <>
                    <NavLink
                      to={"agent-profile"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Agent Profile</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>
                    <NavLink
                      to={"add-property"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Add Property</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>
                    <NavLink
                      to={"my-added-property"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">My Added Property</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>
                  </>
                )}

                {/* User Buttons */}
                {userRole === "user" && (
                  <>
                    <NavLink
                      to={"my-profile"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">My Profile</span>
                      ) : (
                        <FaUser className="text-lg" />
                      )}
                    </NavLink>
                    <NavLink
                      to={"wishlist"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Wishlist</span>
                      ) : (
                        <FaHeart className="text-lg" />
                      )}
                    </NavLink>
                    <NavLink
                      to={"property-bought"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">Property bought</span>
                      ) : (
                        <SiBookmyshow className="text-lg" />
                      )}
                    </NavLink>
                    <NavLink
                      to={"my-reviews"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      {isSidebarOpen ? (
                        <span className="ml-2">My reviews</span>
                      ) : (
                        <MdOutlineReviews className="text-lg" />
                      )}
                    </NavLink>{" "}
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-4">
            {isSidebarOpen ? (
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 w-full p-2 rounded text-center"
              >
                Logout
              </button>
            ) : (
              <div className="mt-4">
                <IoLogOut onClick={signOut} className="text-4xl" />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
