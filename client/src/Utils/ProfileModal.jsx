import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileModal = () => {
  const { user, setUser } = useContext(UserContext);
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenProfile(true)}
        className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition"
      >
        {user}
      </button>
      <div
        style={{ height: "100vh", width: "100vw" }}
        onClick={() => setOpenProfile(false)}
      >
        {openProfile ? (
          <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <button
              onClick={() => console.log("Profile clicked")}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-t-lg"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileModal;
