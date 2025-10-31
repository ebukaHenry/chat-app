import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [newUser, setNewUser] = useState("");
  const [users, setUsers]= useState([]);
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = () => {
    if (!currentUser) {
        alert("You must be logged in to add users.");
        navigate("/login");
        return;
    }

    if (!newUser.trim()) {
        alert("Please enter a valid username.");
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.includes(newUser) || newUser === currentUser) {
        alert("This user already exists or is your username!");
        return;
      }
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser("");

    alert(`${newUser} added successfully!`);
    navigate("/user");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-xl font-semibold text-sky-900 mb-4">Add User</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter new username"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="border-2 border-indigo-600 rounded-xl p-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-sky-900 text-white px-4 py-2 rounded-xl hover:bg-sky-800"
        >
          Add
        </button>
      </div>
    </div>
  );
}
