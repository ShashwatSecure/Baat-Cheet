import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {jwtDecode} from "jwt-decode";
import UserHeader from "../components/UserHeader";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("individual");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || "");
      } catch (error) {
        console.error("Invalid token", error);
        setUsername("");
      }
    }
  }, []);

  const renderActionButtons = () => {
    if (selectedTab === "individual") {
      return (
        <button className="bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-xl font-medium shadow-md">
          Start New Chat
        </button>
      );
    } else if (selectedTab === "rooms") {
      return (
        <div className="flex gap-3">
          <button
            className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-xl font-medium shadow-md"
            onClick={() => navigate(`/${username}/create-room`)}
          >
            Create Room
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-xl font-medium shadow-md"
            onClick={() => navigate(`/${username}/join-room`)}
          >
            Join Room
          </button>
        </div>
      );
    }
    return null;
  };

  const renderChats = () => {
    const dummyChats = [
      { id: 1, name: "Pratham", lastMessage: "See you tomorrow!" },
      { id: 2, name: "Shanaya", lastMessage: "Got it, thanks!" },
    ];

    return (
      <div className="space-y-4 mt-6">
        {dummyChats.map((chat) => (
          <div
            key={chat.id}
            className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-xl shadow-md cursor-pointer"
          >
            <div className="font-semibold text-white">{chat.name}</div>
            <div className="text-sm text-gray-400">{chat.lastMessage}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white px-4 py-6">
      {/* Header */}
      <UserHeader />

      {/* Tabs */}
      <div className="flex justify-around mt-6 border-b border-gray-700">
        {["individual", "rooms"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium capitalize ${
              selectedTab === tab
                ? "border-b-2 border-green-500 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === "individual" ? "Individual Chats" : "Chat Rooms"}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex justify-end">{renderActionButtons()}</div>

      {/* Chat list */}
      <div>{renderChats()}</div>
    </div>
  );
};

export default ProfilePage;
