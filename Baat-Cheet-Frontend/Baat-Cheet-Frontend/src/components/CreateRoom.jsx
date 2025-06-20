import React, { useState } from "react";
import { createRoomApi } from "../services/ChatRoomService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const CreateRoom = () => {
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

  async function handleCreateRoom(e) {
    e.preventDefault();
    try {
      await createRoomApi(detail.roomId);
      toast.success("Room created successfully!");
      // Redirect using username from URL params
      navigate(`/chat/${detail.roomId}/${username}`);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md dark:bg-gray-900 rounded px-8 py-4 flex justify-center flex-col">
        <h1 className="text-center text-3xl font-bold mb-4">Create Room</h1>
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div>
            <label htmlFor="roomId">Room ID:</label>
            <input
              onChange={handleInputChange}
              value={detail.roomId}
              type="text"
              name="roomId"
              id="roomId"
              placeholder="Enter a new room ID"
              className="bg-gray-300 text-black p-2 rounded-2xl mt-1 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-2xl w-full hover:bg-green-700 transition-colors"
          >
            Create & Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
