import React, { useState } from "react";
import { joinRoomApi } from "../services/ChatRoomService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const JoinRoom = () => {
  const [detail, setDetail] = useState({
    roomId: "",
  });

  const navigate = useNavigate();
  const { username } = useParams(); // get username from URL

  function handleInputChange(e) {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  }

  async function handleJoinRoom(e) {
    e.preventDefault();
    try {
      await joinRoomApi(detail.roomId);
      toast.success("Joined room successfully!");
      navigate(`/chat/${detail.roomId}/${username}`); // use username from params
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Room not found");
      } else {
        console.error("Error joining room:", error);
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md dark:bg-gray-900 rounded px-8 py-4 flex justify-center flex-col">
        <h1 className="text-center text-3xl font-bold mb-4">Join Room</h1>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div>
            <label htmlFor="roomId">Room ID:</label>
            <input
              onChange={handleInputChange}
              value={detail.roomId}
              type="text"
              name="roomId"
              id="roomId"
              placeholder="Enter room ID"
              className="bg-gray-300 text-black p-2 rounded-2xl mt-1 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-2xl w-full hover:bg-blue-700 transition-colors"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
