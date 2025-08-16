import {
  ArrowLeftIcon,
  ClipboardDocumentIcon,
  CogIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OutputContext } from "../../Context/OutputContext";
import { UserContext } from "../../Context/UserContext";
import socket from "../../Socket/socket";
import { EditorSettingsContext } from "../../Context/EditorsettingsContext";
import SettingModal from "../../Utils/SettingModal";
import { toast } from "react-toastify";

const Topsection = ({ openRight }) => {
  const { code, runCode } = useContext(OutputContext);
  const { users } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage } = useContext(
    EditorSettingsContext
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleGoBack = () => {
    socket.emit("leave-room");
    navigate("/");
  };

  const handleRun = () => {
    if (window.innerWidth <= 640) {
      // sm screen (Tailwind sm breakpoint is 640px)
      runCode();
      openRight();
    } else {
      runCode();
    }
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `code.${language === "javascript" ? "js" : language}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("File is downloading");
  };

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  const handleCopy = () => {
    if (!roomId) return toast.error("No room ID found");
    navigator.clipboard
      .writeText(roomId)
      .then(() => toast.success(`Room ID copied to clipboard!`))
      .catch(() => toast.error("Failed to copy room ID"));
  };

  return (
    <div
      style={{ height: "50px" }}
      className="flex flex-wrap items-center justify-between bg-black text-white px-4 py-2 border-b border-gray-800 gap-2"
    >
      {/* Left Section */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={handleGoBack}
          className="border border-gray-700 bg-gradient-to-r from-purple-950 to-green-800 hover:bg-green-800 flex items-center gap-2 px-3 py-1 rounded text-sm"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Go Back</span>
        </button>
        <div className="bg-green-950 px-2 py-1 flex items-center rounded-4xl">
          <div className="rounded-full h-2 w-2 bg-green-400" />
          <p className="text-xs ms-2 text-green-400">{users.length} online</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={handleRun}
          className="border border-gray-700 bg-none hover:bg-green-800 flex items-center gap-2 px-1 py-1 rounded text-sm"
        >
          <PlayIcon className="h-4 w-4" />
          <span className="hidden md:inline">Run</span>
        </button>
        <button
          onClick={handleSave}
          className="border border-gray-700 bg-none hover:bg-green-800 flex items-center gap-2 px-3 py-1 rounded text-sm"
        >
          <FaSave className="h-4 w-4" />
          <span className="hidden md:inline">Save</span>
        </button>
        <button
          onClick={handleCopy}
          className="border border-gray-700 bg-none hover:bg-green-800 flex items-center gap-2 px-3 py-1 rounded text-sm"
        >
          <ClipboardDocumentIcon className="h-4 w-4" />
          <span className="hidden md:inline">Copy Room Id</span>
        </button>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="border border-gray-700 bg-none hover:bg-green-800 flex items-center px-2 py-1 rounded"
        >
          <CogIcon className="h-5 w-5" />
        </button>
        <SettingModal
          isOpen={isOpen}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Topsection;
