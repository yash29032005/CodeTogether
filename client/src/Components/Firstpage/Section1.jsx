import TextType from "../../Utils/TestType";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/24/solid";
import Modal from "../../Utils/Modal";

const Section1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      id="section1"
      className="min-h-screen md:pt-0 pt-[60px] bg-black text-white flex items-center justify-center px-8"
    >
      <div className="md:w-10/12 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Slide from Left */}
        <div>
          <span className="px-4 py-1 bg-gradient-to-r from-purple-950 to-green-800 rounded-full text-sm">
            🚀 Now with AI-powered collaboration
          </span>
          <h1 className="mt-4 text-5xl font-bold leading-tight">
            Code{" "}
            <span className="bg-gradient-to-r from-purple-950 to-green-800 bg-clip-text text-transparent">
              Together
            </span>{" "}
            Anywhere
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            The only collaborative IDE where your code runs instantly, your
            friends code in real-time, and AI helps you build faster.
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="hover:scale-110 duration-900 ease-in-out px-6 py-3 bg-gradient-to-r from-purple-950 to-green-800 rounded-lg font-medium transition"
            >
              Start Coding
            </button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
          </div>
        </div>

        {/* Right Section - Slide from Right */}
        <div className="flex items-center justify-center text-white font-mono">
          <div className="relative bg-gray-900 rounded-lg shadow-lg w-full border border-gray-800 p-5">
            <CodeBracketIcon
              className=" absolute w-8 h-8 p-2 bg-green-900 rounded -top-4 -right-4 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
            <ShareIcon
              style={{ animationDelay: "0.5s" }}
              className=" absolute w-8 h-8 p-2 bg-purple-900 rounded -bottom-4 -left-4 animate-bounce"
            />
            {/* Header */}
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-[0.6rem] text-gray-300">
                  collaboration.html
                </span>
              </div>
              <span className="text-xs text-green-400">● 3 online</span>
            </div>

            {/* Code content */}
            <pre className="py-3 text-xs font-mono text-wrap">
              <span className="text-purple-400">&lt;!DOCTYPE html&gt;</span>
              {"\n"}
              <span className="text-purple-400">&lt;html&gt;</span>
              {"\n\t"}
              <span className="text-purple-400">&lt;head&gt;</span>
              {"\n\t\t"} &lt;title&gt;Hello World&lt;/title&gt;
              {"\n\t"} <span className="text-purple-400">&lt;/head&gt;</span>
              {"\n\t"} <span className="text-purple-400">&lt;body&gt;</span>
              {"\n\t\t"} &lt;h1&gt;Open Terminal&lt;/h1&gt;
              {"\n\t\t"} &lt;script&gt;
              {"\n\t\t\t"}console.log("
              <TextType
                text={[
                  "Hello Coder!",
                  "Welcome to",
                  "ChatTogether",
                  "Sorry",
                  "CodeTogether",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="_"
              />
              "){"\n\t\t"} &lt;/script&gt;
              {"\n\t"}
              <span className="text-purple-400">&lt;/body&gt;</span>
              {"\n"}
              <span className="text-purple-400">&lt;/html&gt;</span>
            </pre>

            {/* Footer */}
            <div className="flex justify-between items-center py-2 border-t border-gray-700 text-[0.6rem] text-gray-400">
              <div className="flex space-x-3">
                <span>HTML |</span>
                <span>UTF-8 |</span>
                <span className="text-green-400">Live</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-[#1a1c29]">
                  A
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-[#1a1c29]">
                  B
                </div>
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold border-2 border-[#1a1c29]">
                  C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
