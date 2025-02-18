import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/lottie/home.json";
import { IoLogOut } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const axiosPublic = useAxiosPublic();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setIsSidebarOpen(true); // Open on medium & larger screens
  //     } else {
  //       setIsSidebarOpen(false); // Close on small screens
  //     }
  //   };

  //   handleResize(); // Call on mount

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (user && user.email) {
      // Ensure `user` is not null
      const userEmail = user?.email;
      console.log(userEmail);
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
      {/* TOP BAR */}

      <div className="h-auto w-full flex items-center bg-[#143D3A] justify-between px-6 py-4 shadow-md dark:bg-[#211444] ">
        {/* Toggle Button */}
        <div>
          <button
            onClick={toggleSidebar}
            className=" w-full text-4xl text-white focus:outline-none"
          >
            {!isSidebarOpen ? (
              <MdOutlineDashboardCustomize />
            ) : (
              <LuLayoutDashboard />
            )}
          </button>
        </div>
        {/* Logo */}
        <div className="flex justify-center p-3 md:p-5">
          <Link to={"/"}>
            <Player
              autoplay
              loop
              src={animationData}
              style={{ height: "60px", width: "60px" }} // Adjusted for smaller screens
            />
          </Link>
        </div>

        {/* Greeting Section (Hidden on Small Screens) */}
        <div className="hidden md:flex flex-col text-center md:text-left">
          <p className="text-2xl font-semibold text-white">
            Hi {user?.displayName || "Guest User"}, {greeting}!
          </p>
          <p className="text-lg font-light text-white">
            Welcome to your Dashboard
          </p>
        </div>

        {/* Theme Button */}
        <label className="swap swap-rotate text-white ">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          {/* Sun icon */}
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon icon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* User Info Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Profile Image */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name */}
          <div className="hidden md:flex">
            <div className="text-white text-center md:text-left">
              <p className="text-sm md:text-lg font-medium">
                {user?.displayName || "Guest User"}
              </p>
              {user?.email && (
                <p className="text-xs md:text-sm font-light">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "calc(100vh - 100px)" }} className="flex  ">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col justify-between`}
        >
          {/*! Sidebar */}
          <div onClick={toggleSidebar}>
            {/* Sidebar Content */}

            <div className="mt-4 p-4">
              <ul>
                {/* Admin Buttons */}

                {userRole === "admin" && (
                  <>
                    <NavLink
                      to={"admin-stats"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      Stats
                    </NavLink>
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
                      Manage Users
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
                      Admin Profile
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
                      Manage Properties
                    </NavLink>

                    <NavLink
                      to={"advertise-property"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      Advertise Property
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
                      Manage Reviews
                    </NavLink>
                  </>
                )}

                {/* Agent Buttons */}
                {userRole === "agent" && (
                  <>
                  <NavLink
                      to={"selling-statistics"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      Statistics
                    </NavLink>
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
                      Agent Profile
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
                      Add Property
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
                      My Added Property
                    </NavLink>
                    <NavLink
                      to={"requested-property"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      Requested Property
                    </NavLink>
                    <NavLink
                      to={"my-sold-property"}
                      className={({ isActive }) =>
                        `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                          isActive
                            ? "text-white font-bold border-white border-2 bg-red-500"
                            : "text-white"
                        }`
                      }
                    >
                      My Sold Property
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
                      My Profile
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
                      Wishlist
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
                      Property bought
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
                      My reviews
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
        <div className="flex-1 bg-gray-100 overflow-y-auto h-full dark:bg-[#0B0716] ">
          <Outlet context={{ theme, toggleTheme }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
