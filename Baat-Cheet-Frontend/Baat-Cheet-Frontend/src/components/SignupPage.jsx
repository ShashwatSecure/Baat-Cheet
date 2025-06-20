import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../services/UserService";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuggestions([]);

    try {
      await signupUser(username, password);
      navigate(`/`);
    } catch (err) {
      setErrorMsg(err.message || "Signup failed.");
      if (err.suggestions) {
        setSuggestions(err.suggestions);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Account</h2>

        {errorMsg && (
          <div className="mb-4 text-red-400 text-sm text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
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
            Sign Up
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="mt-4 text-sm text-gray-300">
            <p className="mb-2">Username suggestions:</p>
            <ul className="list-disc list-inside text-green-400">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:underline"
                  onClick={() => setUsername(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-green-400 hover:underline ml-1"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
