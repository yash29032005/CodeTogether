import React, { useState } from "react";
import Userlist from "./Userlist";
import Filelist from "./Filelist";
import { FaArrowLeft } from "react-icons/fa";

const Leftsection = ({ left, setLeft }) => {
  const [files, setFiles] = useState(false);
  const [friends, setFriends] = useState(true);

  function openFiles() {
    setFiles(true);
    setFriends(false);
  }

  function openFriends() {
    setFiles(false);
    setFriends(true);
  }

  return (
    <div
      className={`md:w-2/12 w-0 border border-gray-800 bg-black md:inline z-10 h-full
       ${left ? "fixed top-0 left-0 w-6/12" : "hidden md:flex"}`}
    >
      <button
        onClick={() => setLeft(false)}
        className="md:hidden absolute -right-14 text-sm py-2 px-3 bg-gray-900
        hover:bg-gray-800 rounded-2xl m-2 text-white z-100"
      >
        <FaArrowLeft />
      </button>
      <div className="bg-gray-800 w-full p-1 flex items-center justify-center">
        <button
          onClick={openFriends}
          className={`flex-1 text-sm py-1 ${
            files ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          Friends
        </button>
        <button
          onClick={openFiles}
          className={`flex-1 text-sm py-1 ${
            friends ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          Files
        </button>
      </div>
      <hr className="text-gray-800" />
      <div className="overflow-y-auto md:h-[91%] h-full p-1">
        {files ? <Filelist /> : <Userlist />}
      </div>
    </div>
  );
};

export default Leftsection;
