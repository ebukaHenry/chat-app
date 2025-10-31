import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import SearchBar from "./SearchBar";

export default function User() {
    const username = localStorage.getItem("username");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    const newSocket = io("https://chat-app-backend-qz1e.onrender.com");
    setSocket(newSocket);

    newSocket.emit("register", username);

    newSocket.on("users", (userList) => {
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        const combinedUsers = [...new Set([...userList, ...localUsers])];
        const cleaned = combinedUsers.filter((u) => u !== username);
        setUsers(cleaned);
        setFilteredUsers(cleaned);
       
    });

    return () => {
        newSocket.disconnect();
    }
    }, [username]);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter((u) => u.toLowerCase().includes(search.toLowerCase()))
            );
        }
    }, [search, users]);

    const handleSearch = (input) => {
        setSearch(input);
    }


    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
        
        <h3 className="fixed top-0 right-0 left-0 bg-white text-left text-lg font-semibold text-sky-900 ml-8 py-3 px-4 z-10">
            TalkApp
        </h3>

        <div className="mt-10 px-14 w-full">
        <SearchBar onSearch={handleSearch}/>
        </div>

        <div className="flex-1 w-full overflow-y-auto mt-2 pb-4">
        {filteredUsers.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No users found</p>
        ) : (
            filteredUsers.map((user) => (
          <div
            key={user}
            onClick={() => navigate("/chat", {state: {recipient: user}})}
            className="flex w-full items-center gap-3 bg-white p-3 mb-1 rounded-md shadow-sm cursor-pointed hover:bg-sky-100 transition"
        >
            <div className="w-16 h-16 rouded-full overflow-hidden border border-gray-300 flex-shrink-0">
                <img 
                src="/img/andrew.jpg"
                alt={`${user} avatar`}
                className="w-full h-full object-cover"
                onError={(e)=> (e.target.style.display = 'none')} />
                {!user.includes(".") && (
                    <div className="w-full h-full flex items-center justify-center bg-sky-900 text-white font-semibold rounded-full">
                        {user.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="flex-1 text-left">
                <strong className="text-sky-900">
                    {user}
                </strong>
            </div>
          </div>
        ))
    )}
      </div>
      </div>
    )
}