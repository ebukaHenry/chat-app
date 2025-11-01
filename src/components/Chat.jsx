import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";

export default function Chat() {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const recipient = location.state?.recipient || "";
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.PROD 
  ? "https://chat-app-backend-qz1e.onrender.com" 
  : "http://localhost:10000"
  );
    setSocket(newSocket);


    newSocket.emit("register", username);

    const timestamp = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    newSocket.on("receive_message", ({ sender, message, timestamp }) => {
      setChat((prev) => [...prev, { sender, message, timestamp }]);
    });

 
    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  const sendMessage = () => {
    if (recipient && message.trim()) {
      const timestamp = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
      socket.emit("private_message", { sender: username, recipient, message, timestamp });
      setChat((prev) => [...prev, { sender: "You", message, timestamp }]);
      setMessage("");
    } else if (!recipient) {
      alert("Select a user to chat with first!");
    }
  };

  return (
    <div className="fixed fixed top-0 right-0 left-0 w-full flex flex-col h-screen bg-gray-100">
      
        <div className="flex bg-sky-900 text-white text-left py-4 px-4 font-semibold text-lg shadow">
          <div className="w-10 h-10 flex items-center border-2 justify-center bg-sky-800 mr-2 text-white font-semibold rounded-full">
           {recipient.charAt(0).toUpperCase()}
           </div>
           <div>
          {recipient || "Select a user"}
          </div>
        </div>

          <div
            className="flex-1 overflow-y-auto px-4 py-2 bg-white"
            style={{ scrollbarWidth: "thin" }}
          >
            {chat.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center mt-10">No messages</p>
              </div>
            ) : (
              chat.map((c, i) => (
                <div
                key={i}
                className={`mb-2 flex${
                  c.sender === "You" ? "justify-end" : "justify-start"
                }`}>
                  <div
                  className={`px-3 py-2 rounded-lg max-w-xs ${
                    c.sender === "You"
                    ? "bg-sky-900 text-white text-left"
                    : "bg-gray-200 text-gray-800"
                  }`}>
                    <strong>{c.sender}:</strong> {c.message}
                    <p className="text-right text-xs mt-2">{c.timestamp}</p>
                  </div>
                </div>
            ))
            )}
            
          </div>

          <div className="p-4 bh-white flex items-center gap-2 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              onClick={sendMessage}
              className="bg-sky-900 text-white rounded-full px-3 py-2 hover:bg-sky-800 transition"
            >
              <Send className="m-1 w-4 h-4"/>
            </button>
          </div>
        
      </div>
  );
}
