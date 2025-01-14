import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };



      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });

    navigate("/");
      
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded shadow hover:shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
