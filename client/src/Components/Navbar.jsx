import React, { useState, useEffect, useContext, useRef } from "react";
import {
  CodeBracketIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import LoginModal from "../Utils/LoginModal";
import RegisterModal from "../Utils/RegisterModal";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginmodal, setLoginmodal] = useState(false);
  const [registermodal, setRegistermodal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const dropdownRef = useRef(null);

  const openLogin = () => {
    setLoginmodal(true);
    setRegistermodal(false);
  };

  const openRegister = () => {
    setRegistermodal(true);
    setLoginmodal(false);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      <div className="hidden md:flex gap-3 items-center">
        <Link
          to={"https://github.com/yash29032005/CodeTogether"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition">
            Star on Github
          </button>
        </Link>

        {!user ? (
          <button
            onClick={openLogin}
            className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition"
            >
              {user.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => console.log("Profile clicked")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {loginmodal && (
          <LoginModal
            loginmodal={loginmodal}
            setLoginmodal={setLoginmodal}
            openRegister={openRegister}
          />
        )}
        {registermodal && (
          <RegisterModal
            registermodal={registermodal}
            setRegistermodal={setRegistermodal}
            openLogin={openLogin}
          />
        )}
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
          <Link
            to={"https://github.com/yash29032005/CodeTogether"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition w-10/12">
              Star on Github
            </button>
          </Link>

          {!user ? (
            <button
              onClick={openLogin}
              className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition w-10/12"
            >
              Login
            </button>
          ) : (
            <div className="relative w-10/12 text-center" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="border border-gray-700 px-3 py-2 rounded bg-transparent text-white hover:bg-green-900 transition w-full"
              >
                {user.name}
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => console.log("Profile clicked")}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {loginmodal && (
            <LoginModal
              loginmodal={loginmodal}
              setLoginmodal={setLoginmodal}
              openRegister={openRegister}
            />
          )}
          {registermodal && (
            <RegisterModal
              registermodal={registermodal}
              setRegistermodal={setRegistermodal}
              openLogin={openLogin}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
