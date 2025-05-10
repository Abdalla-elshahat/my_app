import "../Navbar/Navbar.css";
import React, { useEffect, useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Logout } from "../../apicalls/auth";
import { Domain} from "../../utels/consts";
import Cookies from "js-cookie";
import { getEmail, getProfile } from "../../apicalls/navbar";
import Notification from "./notifactions"
import { getAllUsers } from "../../apicalls/follows";
function Navbar() {
  const token =Cookies.get("token")
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("")
  const [userPicture, setUserPicture] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [notifications, setNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
      getProfile(setUserName, setUserPicture);
      getEmail(setUserEmail);
      getAllUsers(setUsers);
  }, []);
  
    // تصفية المستخدمين بناءً على البحث
    const filteredUsers = users.filter((user) =>
      user.displayname.toLowerCase().includes(search.toLowerCase())
    );
  
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
                  value={search}
                 onChange={(e) => setSearch(e.target.value)}
                  />
{search && (
  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <Link
          key={user.id}
          to={`/profileusers/${user.id}`}
          className="flex items-center p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setSearch("")} // لإخفاء النتائج عند الضغط
        >
          <img
            src={`${Domain}/${user.pictureUrl}` || "/default-profile.png"}
            alt={user.displayname}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span className="text-sm">{user.displayname}</span>
        </Link>
      ))
    ) : (
      <div className="p-2 text-sm text-gray-500">No users found</div>
    )}
  </div>
)}
                </div>
              </div>
            </div>

            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-4">
              {token ? (
                <>
             <div className="relative"> {/* جعل العنصر الأب نسبيًا */}
            <button onClick={() => setNotifications(!notifications)} className="p-1 rounded-full  text-gray-500 hover:text-gray-700 focus:outline-none relative">
            <Bell className="h-6 w-6" />
            </button>
            {notifications && <Notification />}
           </div>
                  <div className="flex items-center">
                  <Link to={"/profile"}> <img
          className="h-10 w-10 rounded-full ml-2"
          src = {`${Domain}${userPicture}`}
          alt="User profile"
        /></Link> 

                  </div>
                  <div className="auth-buttons">
                    <button className="login-btn py-[4px] px-[18px]">
                      <Link
                        onClick={(e) =>
                          Logout(e, setError, setLoading, navigate)
                        }
                      >
                        Logout
                      </Link>
                    </button>
                  </div>
                </>
              ) : (
                <div className="auth-buttons">
                  <button className="login-btn py-[4px] px-[18px]">
                    <Link to={"/login"}>Log in</Link>
                  </button>
                  <button className="signup-btn py-[4px] px-[18px]">
                    <Link to={"/signup"}>Sign Up</Link>
                  </button>
                </div>
              )}
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

            <NavLink
              to="/AddFriends"
              className={({ isActive }) =>
                `border-l-4 block pl-3 pr-4 py-2 text-base font-medium ${
                  isActive ? "border-l-[#3362C8]" : ``
                }`
              }
            >
              Add Friends
            </NavLink>



          </div>

          {/* Mobile action buttons */}

          <div className="pt-4 pb-3 border-t border-gray-200">
            
            <div className="flex items-center px-4">


<div className="flex items-center justify-between w-full space-x-4 bg--500">
  {token ? (
    <>
      <div className="flex-shrink-0">
      <Link to={"/profile"}> <img
          className="h-10 w-10 rounded-full ml-2"
          src = {`${Domain}${userPicture}`}
          alt="User profile"
        /></Link> 

<div className="ml-3">
        <div className="text-base font-medium text-gray-800">{userName}</div>
        <div className="text-sm font-medium text-gray-500">{userEmail}</div>
      </div>
      </div>



      <div className="auth-buttons">
      <button onClick={() => setNotifications(!notifications)} className="p-1 rounded-full  text-gray-500 hover:text-gray-700 focus:outline-none relative">
            <Bell className="h-6 w-6" />
            </button>
            {notifications && <Notification />}

                    <button className="login-btn py-[4px] px-[18px]">
                      <Link
                        onClick={(e) =>
                          Logout(e, setError, setLoading, navigate)
                        }
                      >
                        Logout
                      </Link>
                    </button>
                  </div>
    </>
  ) : (
    <div className="flex ml-auto">
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn py-[4px] px-[14px] md:px-[18px] font-bold text-sm">Log in</button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn py-[4px] px-[14px] md:px-[18px] font-bold text-sm">Sign Up</button>
        </Link>
      </div>
    </div>
  )}
</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;