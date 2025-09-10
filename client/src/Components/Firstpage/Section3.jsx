import React from "react";
import { FaCode } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Section3() {
  return (
    <div className="bg-black h-auto flex justify-center items-center py-20 px-5">
      {/* Card */}
      <div className="z-10 bg-gray-900 p-8 rounded-xl border border-purple-500/20 w-10/12 md:w-8/12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-purple-0 text-3xl text-white">
          <FaCode />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white">
          Ready to code{" "}
          <span className="bg-gradient-to-r from-purple-950 to-green-800 bg-clip-text text-transparent">
            together
          </span>
          ?
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 mt-2">
          Join thousands of developers building the future, one collaboration at
          a time.
        </p>

        {/* Button */}
        <a href="#section1">
          <button className="mx-auto mt-6 flex items-center gap-2 hover:scale-110 duration-900 ease-in-out px-6 py-3 bg-gradient-to-r from-purple-950 to-green-800 rounded-lg font-medium transition text-white">
            Get Started Free <FaArrowRight />
          </button>
        </a>
      </div>
    </div>
  );
}

export default Section3;
