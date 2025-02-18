import useAuth from "../../../hooks/useAuth";

const AgentProfile = () => {
  const { user } = useAuth();

  // Format date to local time
  const formatDateToLocalTime = (utcDate) => {
    if (!utcDate) return "N/A";
    return new Date(utcDate).toLocaleString(undefined, {
      timeZoneName: "short", // Adds timezone abbreviation
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const userInfo = {
    email: user?.email || "N/A",
    role: user?.role || "agent",
    joinedDate: formatDateToLocalTime(user?.metadata?.creationTime),
    lastLogin: formatDateToLocalTime(user?.metadata?.lastSignInTime),
  };

  return (
    <div
      className="relative h-full min-h-screen bg-cover bg-center dark:bg-gray-900 text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/ca/4d/23/ca4d2391455ade48053c0b6861842574.gif')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center h-full py-10 px-4">
        {/* Profile Card */}
        <div
          className="w-full max-w-lg backdrop-blur-md bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-80 rounded-xl shadow-lg p-6 md:p-8"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-md">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-gray-200">
              {user?.displayName || "User"}
            </h2>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              {userInfo.email}
            </p>
            {userInfo.role && (
              <span className="inline-block mt-2 px-4 py-1 text-sm font-medium text-white bg-orange-600 dark:bg-orange-500 rounded-full shadow-md">
                {userInfo.role}
              </span>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-white dark:text-gray-300">
            <h3 className="text-lg font-semibold border-b border-gray-400 pb-2 dark:border-gray-600">
              Additional Information
            </h3>
            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li>
                <strong>Role:</strong> {userInfo.role}
              </li>
              <li>
                <strong>Joined Date:</strong> {userInfo.joinedDate}
              </li>
              <li>
                <strong>Last Login:</strong> {userInfo.lastLogin}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
