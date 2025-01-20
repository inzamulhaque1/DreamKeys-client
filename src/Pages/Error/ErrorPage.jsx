/* eslint-disable react/no-unescaped-entities */
import '../Error/ErrorPage.css'; // Make sure to create this CSS file

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-bounce">
          404
        </h1>
        <p className="text-2xl mt-4 text-gray-700 text-gradient">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
