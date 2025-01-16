import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [userRole, setUserRole] = useState(""); // To store the user role
  const axiosSecure = useAxiosSecure(); // Custom Axios hook
  const navigate = useNavigate();


  // Fetch the user role from the backend
  useEffect(() => {
    if (!user) {
      return; // Exit if user is null
    }
  
    const userEmail = user.email;
    console.log(user.photoURL);
  
    axiosSecure.get(`/users?email=${userEmail}`).then((response) => {
      const users = response.data; // Expecting an array
      const currentUser = users.find((u) => u.email === userEmail);
      setUserRole(currentUser?.role || "user");
    });
  }, [axiosSecure, user]);
  
  

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    if (userRole === "admin") {
      navigate("/dashboard/admin-profile");
    } else if (userRole === "agent") {
      navigate("/dashboard/agent-profile");
    } else {
      navigate("/dashboard/my-profile");
    }
  };
  const links = (
    <>
      <li className="text-black">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-black">
        <Link  to={'all-properties'}>All Properties</Link>
      </li>
      <li className="text-black">
        <Link  onClick={handleDashboardClick}>Dashboard</Link>
      </li>
    </>
  );

  return (
    <div className="bg-base-300">
      <div className="navbar w-9/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {" "}
              {links}
            </ul>
          </div>
          <Link to="/" className=" text-xl">
            DreamKeys
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <>
              <p className="text-black mr-6">
                <Link to={"/login"}>Login</Link>
              </p>
              <p className="text-black">
                <Link to={"/sign-up"}>Sign Up</Link>
              </p>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4 font-bold">
              <p>
                <span>{user.displayName}</span>
              </p>
              <button className="btn bg-lime-500 btn-sm mr-5" onClick={logOut}>
                Sign Out
              </button>{" "}
            </div>
          )}
          {user && (
            <div className="avatar online">
              <div className="h-12 w-12 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Avatar"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
