import React, { useEffect, useState } from "react";
import "./Posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComment,faHeart, faShare,faTrash, faEdit,} from "@fortawesome/free-solid-svg-icons";
import AddPosts from "./addposts/Addposts";
import { Domain, Id } from "../../utels/consts";
import AddComment from "./comments/AddComment";
import ReplyComment from "./comments/ReplyComment";
import { fetchCommentsByPostId, fetchLikedUsers, getAllPosts, handleDeleteComment, handleDeletePost, handleShare, handleUpdateComment, handleUpdatePost, toggleLike } from "../../apicalls/posts";
import Comment from "./comments/comment";

const Posts = () => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postComments, setPostComments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImages, setEditImages] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareText, setShareText] = useState("");
  const [postToShare, setPostToShare] = useState(null);
  const [showLikesPopup, setShowLikesPopup] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [currentLikedPostId, setCurrentLikedPostId] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const [showCommentsPopup, setShowCommentsPopup] = useState(false);
const [currentPostForComments, setCurrentPostForComments] = useState(null);
const handleShowComments = (postId, post) => {
  if (selectedPostId === postId) {
    setSelectedPostId(null);
  } else {
    setSelectedPostId(postId);
    setCurrentPostForComments(post);
    setShowCommentsPopup(true);
    if (!postComments[postId]) {
      fetchCommentsByPostId(postId, setPostComments, setIsLoading);
    }
  }
};
  useEffect(() => {
    getAllPosts(setData);
  }, []);

  const openShareModal = (post) => {
    setPostToShare({
      ...post,
      likesCount: 0,
      sharesCount: 0,
      commentCount: 0,
      isLiked: false,
    });
    setShareText("");
    setIsShareModalOpen(true);
  };
  //   console.log("postId clicked:", postId);
  //   setSelectedPostId(postId);
  //   if (!postComments[postId]) {
  //     fetchCommentsByPostId(postId,postId,setPostComments,setIsLoading);
  //   }
  // };
// const handleShowComments = (postId) => {
//   if (selectedPostId === postId) {
//     // إغلاق الكومنت لو هو ظاهر بالفعل
//     setSelectedPostId(null);
//   } else {
//     // فتح الكومنت
//     setSelectedPostId(postId);
//     if (!postComments[postId]) {
//       fetchCommentsByPostId(postId,setPostComments,setIsLoading);
//     }
//   }
// };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="all-posts">
      <AddPosts onPostAdded={getAllPosts} />

      <div className="posts">
        {data.map((post, i) => (
          <div className="post" key={post.shareId || post.postId} post={post}>
            <div className="flex justify-center gap-2">
              {post.images.length > 0 &&
                post.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${Domain}${image}`}
                    className="w-60 h-auto object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
                    alt=""
                    onClick={() => setSelectedImage(`${Domain}${image}`)}
                  />
                ))}
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

            <div className="post-content">
              <div className="toppost">
                <div className="left ">
                  <span>
                    <img
                      src={
                        post.user?.pictureUrl
                          ? `${Domain}${post.user.pictureUrl}`
                          : "/default-avatar.png"
                      }
                      alt={post.user?.displayName || "Unknown User"}
                      className="post-author-image "
                    />
                  </span>
                  <span>
                    <p className="post-author">
                      {post.user?.displayName || "Unknown User"}
                    </p>
                    <p className="dateofpost">
                      {new Date(post.postDate).toLocaleDateString()}
                    </p>
                  </span>
                </div>

                <div className="right">
                  <span
                    onClick={() => openShareModal(post)}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faShare} /> {post.sharesCount || 0}
                  </span>

<button
  onClick={() => handleShowComments(post.postId || post.shareId, post)}
  className={`ml-3 flex items-center gap-1 ${
    selectedPostId === (post.postId || post.shareId) ? "text-blue-600" : ""
  }`}
>
  <FontAwesomeIcon icon={faComment} />
  {post.commentCount || 0}
</button>

                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => toggleLike(post,setData)}
                    style={{
                      cursor: "pointer",
                      color: post.isLiked ? "red" : "gray",
                    }}
                  />{" "}
                  <span
                    onClick={() => fetchLikedUsers(post.postId || post.shareId,setLikedUsers,setCurrentLikedPostId,setShowLikesPopup)}
                    style={{ cursor: "pointer" }}
                    className="likes-count"
                  >
                    {post.likesCount || 0}
                  </span>
                  {/* && post.postId */}
                  {post.user?.userId === Id  && (
                    <div className="post-actions">
                      <button
                        onClick={() => {
                          setEditPost(post);
                          setEditTitle(post.title);
                          setEditImages([]);
                        }}
                        style={{ fontSize: "18px" }}
                        className="ml-3 text-blue-600 hover:text-blue-800 font-normal transition-colors duration-200 px-1 py-1 rounded-md bg-blue-50 hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.postId,setData)}
                        style={{ fontSize: "18px" }}
                        className="ml-3 text-red-600 hover:text-red-800 font-normal transition-colors duration-200 px-1 py-1 rounded-md bg-red-50 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="post-title">{post.title || ""}</h3>
            </div>

            {post.type === "Share" && post.sharedFrom && (
              <div className="shared-from-info p-2 mt-4 border-t border-gray-300">
                <div className="original-author flex items-center mb-2">
                  <img
                    src={`${Domain}${post.sharedFrom.user.pictureUrl}`}
                    className="w-10 h-10 rounded-full mr-2"
                    alt={post.sharedFrom.user?.displayName || "Unknown User"}
                  />
                  <strong>
                    {post.sharedFrom.user?.displayName || "Unknown User"}
                  </strong>
                </div>
                <div>{post.sharedFrom.title}</div>
              </div>
            )}

            <AddComment
              postId={post.postId}
              shareId={post.shareId}
              onCommentAdded={(newComment) => {
                console.log("New comment:", newComment);
              }}
            />

            {(selectedPostId === post.postId ||selectedPostId === post.shareId) && (
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
                onClick={()=>handleUpdatePost(editPost,editTitle,editImages,setEditPost)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showLikesPopup && (
        <div className="modal-overlay" onClick={() => setShowLikesPopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Liked by</h2>
              <button
                onClick={() => setShowLikesPopup(false)}
                className="close-btn"
              >
                &times;
              </button>
            </div>
            <div className="liked-users-list">
              {likedUsers.length > 0 ? (
                likedUsers.map((user) => (
                  <div key={user.userId} className="liked-user">
                    <img
                      src={
                        user.user.pictureUrl
                          ? `${Domain}${user.user.pictureUrl}`
                          : "/default-avatar.png"
                      }
                      alt={user.user.displayName}
                      className="user-avatar"
                    />
                    <span className="user-name">{user.user.displayName}</span>
                  </div>
                ))
              ) : (
                <p className="no-likes">No likes yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {isShareModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Share Post</h2>
            <textarea
              className="w-full border p-2 mb-4 rounded"
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              placeholder="Write something for your shared post..."
            />
            <div className="modal-actions">
              <button
                className="bg-slate-400 p-2 rounded text-white"
                onClick={() => setIsShareModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 p-2 rounded text-white"
                onClick={() => handleShare(postToShare,shareText,setData,setIsShareModalOpen,setShareText)}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Posts;