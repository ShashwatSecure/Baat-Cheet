import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { FiSettings } from "react-icons/fi";

const UserHeader = () => {
  const { username: paramUsername } = useParams();
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (e) {
        console.error("Invalid token");
      }
    } else if (paramUsername) {
      setUsername(paramUsername);
    }
  }, [paramUsername]);

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-900 rounded-xl px-6 py-4 shadow-lg flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{username}</h2>
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="text-white hover:text-green-400 transition"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <FiSettings size={24} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-600 rounded-lg shadow-lg z-50">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white rounded-t-lg border-b-2"
            >
              Sign Out
            </button>
            <button
              onClick={() => alert("Account settings page coming soon")}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white border-b-2"
            >
              Account Settings
            </button>
            <button
              onClick={() => alert("Help section coming soon")}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white rounded-b-lg"
            >
              Help
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
