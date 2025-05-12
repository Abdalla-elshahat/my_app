import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react"; // or any icon library

const PostActions = ({
  post,
  Id,
  setEditPost,
  setEditTitle,
  setEditImages,
  handleDeletePost,
  setData,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (post.user?.userId !== Id) return null;

  const handleEdit = () => {
    setEditPost(post);
    setEditTitle(post.title);
    setEditImages([]);
    setShowMenu(false);
  };

  const handleDelete = () => {
    handleDeletePost(post.postId, setData);
    setShowMenu(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="p-1 hover:bg-gray-100 rounded " style={{ position: "absolute", right: "10px", top: "11px" }}
      >
        <MoreVertical size={20} />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-10 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-20 text-center">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostActions;