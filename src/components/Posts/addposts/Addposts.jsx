import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegImages } from "react-icons/fa";
import "./addposts.css"
function AddPosts() {
  const [postContent, setPostContent] = useState("");
  return (
    <div className="addposts bg-white p-4 rounded-2xl shadow-md  my-5 mx-4">
      <div className="flex items-center space-x-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl8ChEz5aiEtyp5HkGleh0-J3JH8tUGCF3Hw&s"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Write something here ..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* أيقونات وزر النشر */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-3">
          <button className="p-2 text-gray-500 hover:text-blue-500 border border-gray-300 rounded-lg">
            <FaRegImages size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-500 border border-gray-300 rounded-lg">
            <CiLocationOn size={20} />
          </button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition">
          Post
        </button>
      </div>
    </div>
  );
}

export default AddPosts;
