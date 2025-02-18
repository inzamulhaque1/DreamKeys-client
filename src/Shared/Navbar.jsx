/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import logoDark from "../assets/logo/DKDarkLogo.png";
import logo from "../assets/logo/DKLogoMain.png";
const Navbar = ({ toggleTheme, theme }) => {
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState(""); // To store the user role
  // const [theme, setTheme] = useState("light"); // State for theme
  const axiosSecure = useAxiosSecure(); // Custom Axios hook
  const navigate = useNavigate();

  // Fetch the user role from the backend
  useEffect(() => {
    if (!user) {
      return; // Exit if user is null
    }

    const userEmail = user.email;

    axiosSecure.get(`/users?email=${userEmail}`).then((response) => {
      const users = response.data; // Expecting an array
      const currentUser = users.find((u) => u.email === userEmail);
      setUserRole(currentUser?.role || "user");
    });
  }, [axiosSecure, user]);

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    if (userRole === "admin") {
      navigate("/dashboard/admin-stats");
    } else if (userRole === "agent") {
      navigate("/dashboard/agent-profile");
    } else {
      navigate("/dashboard/my-profile");
    }
  };

  const loggedInLinks = (
    <>
      <li className="text-black  dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"all-properties"}>All Properties</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"Heatmap"}>Heatmap</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"Valuation"}>Valuation</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"live-Chat"}>Live Chat</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link onClick={handleDashboardClick}>Dashboard</Link>
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      <li className="text-black  dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"all-properties"}>All Properties</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"Heatmap"}>Heatmap</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"Valuation"}>Valuation</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"live-Chat"}>Live Chat</Link>
      </li>
      <li className="text-black dark:text-white hover:bg-blue-600 rounded-xl hover:text-white">
        <Link to={"faq"}>FAQ</Link>
      </li>
    </>
  );

  return (
    <div className="bg-white/70 roboto dark:bg-[#0B0716] backdrop-blur-md sticky top-0 z-50">
      <div className="navbar w-full lg:w-9/12 mx-auto px-4 lg:px-0 ">
        {/* Navbar Start (Logo and Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn dark:text-white btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dark:bg-[#0B0716] menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user ? loggedInLinks : loggedOutLinks}
            </ul>
          </div>
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            <img
              className="h-[60px]"
              src={theme === "dark" ? logoDark : logo}
              alt=""
            />
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{user ? loggedInLinks : loggedOutLinks}</ul>
        </div>

        {/* Navbar End (Theme Toggle, Login/Signup, or User Info) */}
        <div className="navbar-end gap-4 dark:text-white flex items-center">
          {/* Theme Button */}
          <label className="swap swap-rotate">
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

          {/* Login/Signup or User Info */}
          {!user ? (
            <>
              <p className="mr-4 ">
                <Link
                  to="/login"
                  className="relative text-black border-2 border-black px-4 py-1 lg:px-6 lg:py-2 rounded-full font-medium text-sm lg:text-lg tracking-wide shadow-sm transition-all duration-300 overflow-hidden 
                  before:absolute before:inset-0 before:bg-black before:rounded-full before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
                  hover:text-white hover:shadow-md hover:before:scale-x-100 dark:text-white dark:border-white dark:hover:text-black dark:before:bg-white"
                >
                  <span className="relative z-10">Login</span>
                </Link>
              </p>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4 font-bold">
              <p>
                <span>{user.displayName}</span>
              </p>
              <button className="btn bg-lime-500 btn-sm mr-5" onClick={logOut}>
                Sign Out
              </button>
              {/* User Avatar */}
              <div className="avatar online">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
