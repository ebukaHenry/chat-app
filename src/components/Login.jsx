import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoader(true)
    if (username.trim()) {
      localStorage.setItem("username", username);
      setTimeout(() => {
        setLoader(false);
         navigate("/user");
    }, 1500);
    }
    
  };

  return (
    <div className="fixed fixed top-0 right-0 left-0 w-full flex flex-col justify-center items-center min-h-screen bg-sky-900 text-white px-4">
      <h2 className="text-2xl font-semibold mb-6">Welcome to Lets talk App 💬</h2>
      <div className="flex flex-col gap-4 bg-white text-sky-900 rounded-lg shadow-md p-6 w-full max-w-sm">
      <input 
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-2 border-sky-700 border-double p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        required
      />
      <button 
      onClick={handleLogin}
      disabled={loader}
      className="bg-sky-900 text-white font-semibold rounded-md p-2 hover:bg-sky-800 transition"
      >
        {loader ? <Loader className="animate-spin text-sky-600 w-10 h-10 cursor-not-allowed" /> : "Login"}
      </button>

      <hr />

      <button className="bg-white border border-2 border-gray-300 py-2 px-2 rounded-md hover:text-white hover:bg-sky-800 transition">
        <span>Sign in with Google</span>
      </button>
      </div>
      
    </div>
  );
}