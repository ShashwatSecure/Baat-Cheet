import React, { useRef, useState, useEffect } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useParams } from "react-router";

const ChatRoom = () => {
  const { roomId, username } = useParams();

  const [messages, setMessages] = useState([
    { content: "Hey!", sender: "Pratham" },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [currentUser] = useState(username);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { content: input.trim(), sender: currentUser },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 flex justify-between items-center px-6 h-20 fixed top-0 w-full z-10 shadow-md">
        <button className="text-lg bg-blue-600 px-4 py-2 rounded-2xl">View Members</button>
        <div className="text-lg font-semibold">User: {currentUser}</div>
        <div className="text-lg font-semibold">Room: {roomId}</div>
        <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-2xl">
          Leave Room
        </button>
      </header>

      {/* Chat Section */}
      <main ref={chatBoxRef} className="flex-1 overflow-auto pt-24 pb-32 px-4">
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender === currentUser;
            return (
              <div
                key={index}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-end gap-2 max-w-lg">
                  {/* {!isCurrentUser && (
                    <img className="h-8 w-8 rounded-full" src="" alt="Avatar" />
                  )} */}
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      isCurrentUser
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p className="text-sm font-semibold">{message.sender}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {isCurrentUser && (
                    <img className="h-8 w-8 rounded-full" src="" alt="Avatar" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Input Box */}
      <div className="fixed bottom-0 w-full px-4 py-3 bg-gray-900 shadow-inner">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message here..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors rounded-full h-10 w-10 flex justify-center items-center">
            <MdAttachFile size={20} />
          </button>
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 transition-colors rounded-full h-10 w-10 flex justify-center items-center"
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
