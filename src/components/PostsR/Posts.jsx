import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import AddPosts from "./addposts/Addposts";
import { Domain, Id } from "../../utels/consts";
import AddComment from "./comments/AddComment";
import {
  fetchCommentsByPostId,
  fetchLikedUsers,
  getAllPosts,
  handleDeleteComment,
  handleDeletePost,
  handleUpdateComment,
  handleUpdatePost,
  toggleLike,
} from "../../apicalls/posts";
import Comment from "./comments/comment";
import PostActions from "./comments/PostActions";

const Posts = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [showLikesPopup, setShowLikesPopup] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [currentLikedPostId, setCurrentLikedPostId] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const handleShowComments = (postId, post) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
      if (!postComments[postId]) {
        fetchCommentsByPostId(postId, setPostComments, setIsLoading);
      }
    }
  };

  useEffect(() => {
    getAllPosts(setData);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4">
      <AddPosts onPostAdded={getAllPosts} />
      <div className="flex flex-col w-full mt-10 max-w-[1150px] gap-12">
        {data.map((post) => (
          <div
            key={post.shareId || post.postId}
            className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 p-4"
          >
            <PostActions
              post={post}
              Id={Id}
              setEditPost={setEditPost}
              setEditTitle={setEditTitle}
              setEditImages={setEditImages}
              handleDeletePost={handleDeletePost}
              setData={setData}
            />

            <div className="flex gap-3 items-center mb-3">
              <img
                src={post.user?.pictureUrl ? `${Domain}${post.user.pictureUrl}` : "/default-avatar.png"}
                alt={post.user?.displayName || "Unknown User"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">{post.user?.displayName || "Unknown User"}</p>
                <p className="text-xs text-gray-500">{new Date(post.postDate).toLocaleDateString()}</p>
              </div>
            </div>

            <p className="text-lg font-semibold text-gray-900 break-words mb-3">
              {post.title || ""}
            </p>

            {post.images.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mb-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${Domain}${image}`}
                    className="w-60 h-auto object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
                    alt=""
                    onClick={() => setSelectedImage(`${Domain}${image}`)}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end items-center gap-4 text-gray-600 text-xl">
              <button
                onClick={() => handleShowComments(post.postId || post.shareId, post)}
                className={`flex items-center gap-1 ${selectedPostId === (post.postId || post.shareId) ? "text-blue-600" : ""}`}
              >
                <FontAwesomeIcon icon={faComment} />
                {post.commentCount || 0}
              </button>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => toggleLike(post, setData)}
                className={`cursor-pointer ${post.isLiked ? "text-red-500" : "text-gray-400"}`}
              />
              <span
                onClick={() =>
                  fetchLikedUsers(
                    post.postId || post.shareId,
                    setLikedUsers,
                    setCurrentLikedPostId,
                    setShowLikesPopup
                  )
                }
                className="cursor-pointer text-sm"
              >
                {post.likesCount || 0}
              </span>
            </div>

            {selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  alt="Full View"
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>
            )}

            <AddComment
              postId={post.postId}
              shareId={post.shareId}
              onCommentAdded={(newComment) => {
                console.log("New comment:", newComment);
              }}
            />

            {(selectedPostId === post.postId || selectedPostId === post.shareId) && (
              <Comment
                post={post}
                isLoading={isLoading}
                postComments={postComments}
                selectedPostId={selectedPostId}
                editComment={editComment}
                setEditComment={setEditComment}
                editCommentText={editCommentText}
                setEditCommentText={setEditCommentText}
                handleUpdateComment={handleUpdateComment}
                handleDeleteComment={handleDeleteComment}
              />
            )}
          </div>
        ))}
      </div>

      {editPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl mb-4">Edit Post</h2>
            <textarea
              className="w-full border p-2 mb-4 rounded"
              rows="4"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              type="file"
              multiple
              onChange={(e) => setEditImages(Array.from(e.target.files))}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setEditPost(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdatePost(editPost, editTitle, editImages, setEditPost)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showLikesPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowLikesPopup(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Liked by</h2>
              <button
                onClick={() => setShowLikesPopup(false)}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {likedUsers.length > 0 ? (
                likedUsers.map((user) => (
                  <div key={user.userId} className="flex items-center gap-3">
                    <img
                      src={user.user.pictureUrl ? `${Domain}${user.user.pictureUrl}` : "/default-avatar.png"}
                      alt={user.user.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm font-medium">
                      {user.user.displayName}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No likes yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;