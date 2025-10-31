export default function Profile() {
  const username = localStorage.getItem("username");

  return (
    <div className="fixed fixed top-0 right-0 left-0 w-full flex flex-col min-h-screen bg-gray-50">
      <div className="relative h-1/2 bg-black overflow-visible">
        <div
          className="absolute left-1/2 -bottom-90 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-green-500 bg-white shadow-lg 
                     flex items-center justify-center text-3xl sm:text-4xl font-bold text-green-600"
        >
          {username ? username.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      <div className="flex flex-col items-center justify-start mt-20 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Hi, {username || "Guest"}
        </h2>
        <p className="text-gray-600 text-center max-w-lg">
          Welcome to your profile page! Here you can manage your account and preferences.
        </p>
      </div>
    </div>
  );
}
