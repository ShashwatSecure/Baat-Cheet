import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import { FiSettings } from "react-icons/fi";

const UserHeader = () => {
  const { username: paramUsername } = useParams();
  const [username, setUsername] = useState("");

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

  return (
    <header className="bg-gray-900 rounded-xl px-6 py-4 shadow-lg flex items-center justify-between">
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
      <button className="text-white hover:text-green-400 transition">
        <FiSettings size={24} />
      </button>
    </header>
  );
};

export default UserHeader;
