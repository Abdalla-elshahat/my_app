import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { followUser, getAllUsers } from "../../apicalls/follows";
import { ToastContainer } from "react-toastify";
import { Domain } from "../../utels/consts";
function AddFriends() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  // تصفية المستخدمين بناءً على البحث
  const filteredUsers = users.filter((user) =>
    user.displayname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-full mx-auto p-5">
      <ToastContainer/>
      {/* Search Bar */}
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                {/* صورة دائرية */}
                <img
                  src={`${Domain}/${user.pictureUrl}` || "/default-profile.png"}
                  alt={user.displayname}
                  className="w-12 h-12 bg-gray-300 rounded-full object-cover"
                />
                {/* بيانات المستخدم */}
                <div>
                  <h3 className="text-lg font-semibold">
                    <Link to={`/profileusers/${user.id}`}>{user.displayname}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm">{user.job || "No job listed"}</p>
                </div>
              </div>
              {/* زر Follow */}
              <button
                onClick={(e) => followUser(user.id,e,setUsers)}
                className={`px-4 py-2 rounded-full transition-all ${
                  user.isFollowedByMe
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {user.isFollowedByMe? "Unfollow" : "Follow"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}

export default AddFriends;
