import { CodeBracketIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const LoginModal = ({ loginmodal, setLoginmodal, openRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth } = useContext(UserContext);

  useEffect(() => {
    if (loginmodal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loginmodal]);

  if (!loginmodal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setEmail("");
      setPassword("");
      await checkAuth();
      toast.success(res.data.message || "Login successful");
      setLoginmodal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Unexpected error");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-70 backdrop-blur-xs flex items-center justify-center 
      z-50 transition-opacity duration-300 md:mx-0 mx-5"
      onClick={() => setLoginmodal(false)}
    >
      <div
        className="bg-gray-900 rounded-2xl p-8 w-11/12 md:w-9/12 shadow-2xl transform transition-all 
        duration-300 scale-100 hover:scale-[1.01] border border-gray-800 
        flex flex-col md:flex-row gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Section (Logo + Title) */}
        <div
          className="flex flex-col items-center justify-center md:w-5/12 border-b md:border-b-0 
        md:border-r border-gray-700 pb-6 md:pb-0 md:pr-6"
        >
          <CodeBracketIcon className="w-16 h-16 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent">
            CodeTogether
          </h2>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <h2 className="text-2xl font-semibold text-gray-200">Login</h2>
            <button
              onClick={() => setLoginmodal(false)}
              className="text-gray-400 hover:text-white transition duration-200 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                onClick={openRegister}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>

            {/* Footer */}
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-950 to-green-800 
                 hover:from-purple-800 hover:to-green-700 rounded-lg transition text-white 
                 font-medium shadow-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
