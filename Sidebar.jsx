import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Menghapus token dari localStorage
      navigate("/"); // Mengarahkan ke halaman login
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Sidebar Menu</h2>
      <ul className="space-y-4">
        <li>
          <a href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/profile" className="hover:text-gray-300">
            Profile
          </a>
        </li>
        <li>
          <a href="/settings" className="hover:text-gray-300">
            Settings
          </a>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-300 focus:outline-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
