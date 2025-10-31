import { useLocation, useNavigate } from "react-router-dom";
import { Users, UserPlus, User } from "lucide-react"; // lightweight icon library

export default function FooterNav() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/chat" || location.pathname === "/" || location.pathname === "/login") return null;

  return (
    <footer className="fixed bottom-0 left-0 w-full grid grid-cols-3 divide-x-3 divide-solid divide-gray-600 bg-sky-900 text-white flex justify-around items-center py-3 border-t border-sky-700">
      <button
        onClick={() => navigate("/user")}
        className="flex flex-col items-center hover:text-sky-300 transition"
      >
        <Users size={24} />
        <span className="text-xs mt-1">Users</span>
      </button>

      <button
        onClick={() => navigate("/add")}
        className="flex flex-col items-center hover:text-sky-300 transition"
      >
        <UserPlus size={24} />
        <span className="text-xs mt-1">Add</span>
      </button>

      <button
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center hover:text-sky-300 transition"
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </footer>
  );
}
