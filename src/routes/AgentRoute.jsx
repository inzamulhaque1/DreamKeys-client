import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const [role, setRole] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if the role is fetched
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming this provides authenticated user info

  // Fetch user role
  useEffect(() => {
    if (!user?.email) return; // If no user, skip fetching

    axios
      .get("/users/role", { params: { email: user.email } })
      .then((response) => {
        setRole(response.data.role || "user"); // Fallback to 'user'
        setIsLoaded(true); // Mark as loaded
      })
      .catch(() => {
        setRole("user"); // Fallback to 'user' on error
        setIsLoaded(true); // Mark as loaded even on error
      });
  }, [user]);

  // Redirect if not admin
  useEffect(() => {
    if (isLoaded && role !== "admin") {
      navigate("/"); // Redirect to home if not admin
    }
  }, [isLoaded, role, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      {/* Admin-specific content */}
      <h1>Welcome, Admin!</h1>
    </div>
  );
};

export default AdminRoute;
