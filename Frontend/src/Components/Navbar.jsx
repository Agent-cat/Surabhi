import React, { useState, useRef, useEffect } from "react";
import { navLinks } from "../Constants/Constants";
import { NavLink } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  // Desktop profile dropdown
  const ProfileDropdown = () => (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          {user.fullName.charAt(0)}
        </div>
        <span>{user.fullName}</span>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-500">College: {user.college}</p>
            <p className="text-sm text-gray-500">ID: {user.collegeId}</p>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  // Mobile profile section
  const MobileProfile = () => (
    <div className="border-t border-gray-700 pt-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
          {user.fullName.charAt(0)}
        </div>
        <div>
          <p className="text-white font-medium">{user.fullName}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
      <div className="text-gray-400 text-sm mb-4">
        <p>College: {user.college}</p>
        <p>ID: {user.collegeId}</p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold font-saint-carell text-white hover:text-gray-300 transition-colors">
            SURABHI
          </h1>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-1 rounded-md transition-all duration-300 ease-in-out text-lg"
                  : "text-white hover:text-gray-300 transition-all duration-300 ease-in-out text-lg"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:block">
          {user ? (
            <ProfileDropdown />
          ) : (
            <div className="flex gap-4">
              <NavLink
                to="/login"
                className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-transparent text-white border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all font-medium"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-black transition-transform duration-300 ease-in-out h-screen`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-lg"
                  : "text-white hover:text-gray-300 transition-all duration-300 ease-in-out text-lg"
              }
            >
              {link.title}
            </NavLink>
          ))}
          {user ? (
            <MobileProfile />
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium text-center"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-transparent text-white border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all font-medium text-center"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
