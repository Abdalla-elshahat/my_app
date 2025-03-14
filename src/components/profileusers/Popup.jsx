import React, { useState } from "react";
import { Domain } from "../../utels/consts";
import { Link } from "react-router-dom"
import { followUser } from "../../apicalls/follows";

function Popup({ title, data,setdate, onClose}) {
  const [search,setSearch]=useState("");
    // تصفية المستخدمين بناءً على البحث
    const filteredUsers = data.filter((user) =>
      user.displayName?.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ❌
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

        {/* Users List */}
        <div className="max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm mb-2"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={`${Domain}/${user.pictureUrl}` || "https://via.placeholder.com/50"}
                    alt={user.displayname}
                    className="w-10 h-10 bg-gray-300 rounded-full object-cover"
                  />
                  <div>
                   <Link to={`/profileusers/${user.id}`}><h3 className="text-sm font-semibold"  onClick={onClose}>{user.displayName}</h3></Link>
                    <p className="text-gray-500 text-xs">{user.job || "No job listed"}</p>
                  </div>
                </div>
                     {/* زر Follow */}
              <button
                onClick={(e) => followUser(user.id,e,setdate)}
                className={`px-4 py-2 rounded-full transition-all ${
                  user.isFollowedByCurrentUser
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {user.isFollowedByCurrentUser? "Unfollow" : "Follow"}
              </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
