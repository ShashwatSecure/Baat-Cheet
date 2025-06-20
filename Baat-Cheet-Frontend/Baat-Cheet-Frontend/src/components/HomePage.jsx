import React, { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../services/UserService";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const data = await loginUser(username, password);

      // Save token if needed
      localStorage.setItem("token", data.token);

      // Navigate to profile or chat room
      navigate(`/profile/${username}`);
    } catch (err) {
      setErrorMsg(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome to Baat-Cheet</h2>

        {errorMsg && (
          <div className="mb-4 text-red-400 text-sm text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-green-400 hover:underline ml-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
