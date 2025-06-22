import React, { useEffect, useState } from "react";
import { joinRoomApi, getAllRoomsSortedByMemberStrength } from "../services/ChatRoomService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const JoinRoom = () => {
  const [detail, setDetail] = useState({ roomId: "" });
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRoomsSortedByMemberStrength(0,20);
        console.log("Fetched rooms : ",data.content);
        setRooms(data.content);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
        toast.error("Failed to load rooms");
      }
    };

    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    try {
      await joinRoomApi(detail.roomId,username);
      toast.success("Joined room successfully!");
      navigate(`/chat/${detail.roomId}/${username}`);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Room not found");
      } else {
        console.error("Error joining room:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

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

        {/* Room List */}
        {rooms.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-2">Available Rooms</h2>
            <ul className="space-y-2 max-h-60 overflow-auto">
              {rooms.map((room) => (
                <li
                  key={room.roomId}
                  className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
                  onClick={() => setDetail({ roomId: room.roomId })}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{room.roomId}</span>
                    <span className="text-sm text-gray-300">Members: {room.memberCount}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinRoom;
