import React, { useContext, useState } from "react";
import socket from "../Socket/socket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const RoomjoinModal = ({ setJoinroommodal }) => {
  const [roomId, setRoomId] = useState("");
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user?.name || "");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const joinRoom = () => {
    if (user) {
      if (!roomId || !username) return toast.warn("Enter room ID and username");

      socket.emit("join-room", { roomId, username });
      socket.username = username;
      navigate(`/editor?roomId=${roomId}&username=${username}`);
      toast.success("Enjoy Coding!");
    } else {
      toast.error("Please login");
    }
  };

  // Advanced Room ID Generator
  const generateRoomId = (prefix = "ROOM") => {
    const uniqueId = crypto.randomUUID(); // secure UUID
    return `${prefix}-${uniqueId.slice(0, 8)}`;
  };

  const handleClick = async () => {
    const newId = generateRoomId();
    setRoomId(newId);

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(newId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-60 flex items-center justify-center 
      z-50 transition-opacity duration-300 md:mx-0 mx-5 overflow-hidden"
      onClick={() => setJoinroommodal(false)}
    >
      <div
        className="bg-gray-900 rounded-2xl p-8 w-11/12 md:w-5/12 shadow-2xl transform transition-all 
        duration-300 scale-100 hover:scale-[1.01] border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Join Room</h2>
          </div>
          <button
            onClick={() => setJoinroommodal(false)}
            className="text-gray-400 hover:text-white transition duration-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 text-gray-300 flex flex-col gap-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            required
            className="w-full border border-gray-600 p-3 rounded-lg bg-gray-950 text-white
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <p className="text-sm">
            If you don't have an invite, create a{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={handleClick}
            >
              new one
            </span>
            {copied && <span className="text-green-400 ml-2">Copied!</span>}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={joinRoom}
            className="px-8 py-2 bg-gradient-to-r from-purple-950 to-green-800 hover:bg-green-800 rounded-lg transition duration-200 text-white"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomjoinModal;
