import React, { useState } from "react";
import Output from "./Output";
import Ai from "./Ai";
import Chat from "./Chat";
import { FaArrowRight } from "react-icons/fa";

const Rightsection = ({ right, setRight }) => {
  const [output, setOutput] = useState(true);
  const [ai, setAi] = useState(false);
  const [chat, setChat] = useState(false);

  function openOutput() {
    setOutput(true);
    setAi(false);
    setChat(false);
  }

  function openAi() {
    setAi(true);
    setChat(false);
    setOutput(false);
  }

  function openChat() {
    setChat(true);
    setAi(false);
    setOutput(false);
  }

  return (
    <div
      className={`md:w-3/12 border border-gray-800 bg-black md:flex flex-col z-10 h-full
       ${right ? "fixed top-0 right-0 w-6/12" : "hidden md:flex"}`}
    >
      <button
        onClick={() => setRight(false)}
        className="md:hidden absolute text-sm -left-14 py-2 px-3 bg-gray-900 hover:bg-gray-800 
        rounded-2xl m-2 text-white"
      >
        <FaArrowRight />
      </button>
      <div className="bg-gray-800 w-full p-1 flex items-center justify-center">
        <button
          onClick={openOutput}
          className={`flex-1 text-sm py-1 ${
            output ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          Output
        </button>
        <button
          onClick={openAi}
          className={`flex-1 text-sm py-1 ${
            ai ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          AI
        </button>
        <button
          onClick={openChat}
          className={`flex-1 text-sm py-1 ${
            chat ? "bg-gray-900" : "bg-gray-800"
          }`}
        >
          Chat
        </button>
      </div>
      <hr className="text-gray-800" />
      <div className="overflow-y-auto w-full md:h-[91%] h-full">
        {output ? <Output /> : ai ? <Ai /> : <Chat />}
      </div>
    </div>
  );
};

export default Rightsection;
