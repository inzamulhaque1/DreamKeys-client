import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for React Router v6
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const navigate = useNavigate(); // Use useNavigate for navigation
    const { user } = useAuth(); // Assuming useAuth hook provides the user info

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('/users/role', {
                    params: { email: user?.email }
                });
                setRole(response.data.role);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user role:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserRole();
        } else {
            setLoading(false); // If there's no user, set loading to false
        }
    }, [user]);

    useEffect(() => {
        if (!loading && role !== "admin") {
            navigate("/"); // Redirect to home page if not an admin
        }
    }, [loading, role, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Admin-specific content goes here */}
            <h1>Welcome, Admin!</h1>
        </div>
    );
};

export default AdminRoute;
