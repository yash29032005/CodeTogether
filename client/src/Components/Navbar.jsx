import React, { useState, useEffect } from "react";
import {
  CodeBracketIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-5 transition-colors duration-300 ${
        scrolled ? "backdrop-blur-xs" : "bg-transparent"
      }`}
      style={{ height: "60px", zIndex: 50 }}
    >
      {/* Logo */}
      <div className="font-bold text-2xl bg-gradient-to-r from-purple-950 to-green-800 bg-clip-text text-transparent flex items-center">
        <CodeBracketIcon className="w-8 h-8 p-1 text-purple-950" />
        CodeTogether
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-3">
        <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition">
          Star on Github
        </button>
        <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition">
          Signup
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        {menuOpen ? (
          <XMarkIcon
            className="w-8 h-8 text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        ) : (
          <Bars3Icon
            className="w-8 h-8 text-white cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center gap-4 py-4 md:hidden">
          <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition w-10/12">
            Star on Github
          </button>
          <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition w-10/12">
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
