import "../Navbar/Navbar.css";
import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Link, Navigate, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token =Cookies.get("token");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  async function logout(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://arabdevcommunity.runasp.net/api/Account/Logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        setTimeout(() => Navigate("/login"), 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Unknown error"}`, {
          icon: <FaExclamationCircle color="red" />,
        });
      }
    } catch {
    }
  }
  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
         <ToastContainer />
      <nav className="bg-white shadow-md md:mb-1">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="text-indigo-600 font-bold text-2xl flex items-center">
                  <div className="logo font-aclonica tracking-wider ">
                    ArabDev
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className=" flex items-center flex-1 max-w-md mx-4">
              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="text"
                    className=" block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 focus:outline-none  focus:ring-1 focus:ring-[#3362C8] focus:border-[#3362C8] sm:text-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-4">
            {
  token ? (
    <>
      <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
        <Bell className="h-6 w-6" />
      </button>
      <div className="flex items-center">
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User profile"
        />
      </div>
      <div className="auth-buttons">
      <button className="login-btn">
        <Link onClick={logout}>Logout</Link>
      </button>
      </div>
    </>
  ) : (
    <div className="auth-buttons">
      <button className="login-btn">
        <Link to={"/login"}>Log in</Link>
      </button>
      <button className="signup-btn">
        <Link to={"/signup"}>Sign Up</Link>
      </button>
    </div>
  )
}

</div>
    


            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3362C8]"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/Podcasts"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              Podcasts
            </NavLink>

            <NavLink
              to="/Saved"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              Saved
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile action buttons */}

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
              </div>

              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Tom Cook
                </div>
                <div className="text-sm font-medium text-gray-500">
                  tom@example.com
                </div>
              </div>

              <div className="flex bg--500 ml-auto">
                <div className="auth-buttons">
                  <button className="login-btn">Log in</button>
                  <button className="signup-btn">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
