import React, { useRef, useState, useEffect, useCallback } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useParams,useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { jwtDecode } from "jwt-decode";
import { over } from "stompjs";

const ChatRoom = () => {
  const { roomId, username } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const navigate = useNavigate();

  // Fetch messages (pagination enabled)
  const fetchMessages = useCallback(async () => {
    if (!roomId || isFetchingRef.current || !hasMore) return;
  
    isFetchingRef.current = true;
    try{
      const response = await fetch(`http://localhost:8080/api/messages/${roomId}?page=${page}&size=20`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();

      const sorted = data.content.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

      setMessages(prev => [...sorted, ...prev]);
      setHasMore(!data.last);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      isFetchingRef.current = false;
    }
  }, [roomId, page, hasMore]);

  // Initial load
  useEffect(() => {
    setMessages([]);
    setPage(0);
    setHasMore(true);
  }, [roomId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // WebSocket connection
useEffect(() => {
  const token = localStorage.getItem("token");

  let loggedInUser;
  try {
    if (!token) throw new Error("No token");
    loggedInUser = jwtDecode(token).username;
  } catch (err) {
    alert("Invalid or missing token");
    localStorage.removeItem("token");
    return navigate("/login"); 
  }

  if (username !== loggedInUser) {
    alert("Unauthorized access");
    localStorage.removeItem("token");
    return navigate("/login");
  }

  const socket = new SockJS("http://localhost:8080/chat");
  const stompClient = over(socket);
  stompClientRef.current = stompClient;

  stompClient.connect(
    {
      Authorization: `Bearer ${token}`,
    },
    () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      subscriptionRef.current = stompClient.subscribe(
        `/topic/room/${roomId}`,
        onMessageReceived
      );
    },
    (err) => {
      console.error("STOMP error:", err);
    }
  );

  return () => {
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
    if (stompClientRef.current?.connected) {
      stompClientRef.current.disconnect(() => console.log("Disconnected"));
    }
  };
}, [roomId, username, navigate]);


  // Scroll listener to fetch older messages
  useEffect(() => {
    const div = chatBoxRef.current;
    if (!div) return;

    const onScroll = () => {
      if (div.scrollTop === 0 && hasMore && !isFetchingRef.current) {
        fetchMessages();
      }
    };

    div.addEventListener("scroll", onScroll);
    return () => div.removeEventListener("scroll", onScroll);
  }, [fetchMessages, hasMore]);

  // Auto-scroll to bottom on new message (only for new ones)
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages.length]);

  const onMessageReceived = (payload) => {
    try {
      const message = JSON.parse(payload.body);
      setMessages(prev => {
        if (prev.some(msg => msg.messageId === message.messageId)) return prev;
        return [...prev, message];
      });
    } catch (err) {
      console.error("Invalid message:", err);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const messageToSend = {
      content: input.trim(),
      senderUsername: username,
    };

    setInput("");

    if (stompClientRef.current?.connected) {
      stompClientRef.current.send(
        `/app/send/${roomId}`,
        {},
        JSON.stringify(messageToSend)
      );
    } else {
      console.warn("STOMP not connected");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      {/* Header */}
      <header className="bg-gray-900 flex justify-between items-center px-6 h-20 fixed top-0 w-full z-10 shadow-md">
        <button className="text-lg bg-blue-600 px-4 py-2 rounded-2xl">View Members</button>
        <div className="text-lg font-semibold">User: {username}</div>
        <div className="text-lg font-semibold">Room: {roomId}</div>
        <button 
          onClick={()=>{
            if(subscriptionRef.current)
            {
              subscriptionRef.current.unsubscribe();
              subscriptionRef.current = null;
            }

            if(stompClientRef.current?.connected)
            {
                stompClientRef.current.disconnect(()=>{
                  console.log("Disconnected from WebSocket");
                });
            }
            
            navigate(`/${username}/join-room`);
          }}
          className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-2xl">
          Leave Room
        </button>
      </header>

      {/* Messages */}
      <main
        ref={chatBoxRef}
        className="flex-1 overflow-auto pt-24 pb-32 px-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => {
            const sender = msg.senderUsername || msg.sender;
            const isCurrentUser = sender === username;
            return (
              <div key={msg.messageId || i} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-xl max-w-lg ${isCurrentUser ? "bg-green-600" : "bg-gray-700"}`}>
                  <p className="text-sm font-semibold">{sender}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Input */}
      <div className="fixed bottom-0 w-full px-4 py-3 bg-gray-900 shadow-inner">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message here..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
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
