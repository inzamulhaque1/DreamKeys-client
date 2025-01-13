import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/lottie/login.json";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoFile = e.target.photo.files[0];
  
    
  
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must be at least 6 characters, with one capital letter and one special character.");
      return;
    }

    if (!photoFile) {
        setError("Please upload a valid image.");
        return;
      }
  
    const formData = new FormData();
    formData.append("image", photoFile);
  
    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error("Image upload failed");
        const photoURL = data.data.display_url;
  
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            return updateUserProfile(user, name, photoURL);
          })
          .then(() => navigate(from, { replace: true }))
          .catch((err) => {
            setError(err.message || "An error occurred during registration.");
            console.error(err);
          });
      })
      .catch((err) => {
        setError("Failed to upload image. Please try again.");
        console.error(err);
      });
  };

  
  return (
    <div className="h-screen grid bg-[#97B522] grid-cols-2">
      <div className="flex justify-end items-center">
        <div className="flex justify-center items-center h-screen">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: "600px", width: "600px" }}
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-1 flex justify-start items-center p-6 md:p-10">
          <form
            onSubmit={handleRegister}
            className="space-y-4 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Register Here & get well soon ❤
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              type="file"
              name="photo"
              accept="image/*"
              className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />

            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Sign Up
            </button>
            <SocialLogin></SocialLogin>
            <p className="text-gray-600 text-center dark:text-gray-400">
              <Link
                to="/login"
                className="text-green-500 hover:underline font-semibold"
              >
                Already have an account? Login →
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
