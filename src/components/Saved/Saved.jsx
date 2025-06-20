import React, { useState, useEffect, useContext } from "react";
import { FaBookmark } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Savedpodcast from "./savedpodcasts";
import PostActions from "../PostsR/comments/PostActions";
import Comment from "../PostsR/comments/comment";
import { Domain, token } from "./../../utels/consts";
import { fetchCommentsByPostId, fetchLikedUsers, handleDeleteComment, handleDeletePost, handleUpdateComment, toggleLike } from "../../apicalls/posts";
import { LearningDataContext } from "../../Contexts/LearningData";
import { SavedPostsContext } from "../../Contexts/SavedPostsContext";
import "./Saved.css";

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [isclose, setisclose] = useState(false);
  const { savedPosts, setSavedPosts, setunsve } = useContext(SavedPostsContext);
  const { id } = useContext(LearningDataContext);
  const [failSaved, setfailSaved] = useState("");
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
  const [showCommentsPopup, setShowCommentsPopup] = useState(false);

  const getSaved = () => {
    axios.get(`${Domain}/api/SavedPost/saved-posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setSavedItems(res.data.data || []);
    console.log(res.data.data);
    })
    .catch((err) => {
      console.error("❌ Error fetching saved items:", err);
    });
  };

  useEffect(() => {
    getSaved();
  }, []);

  const handleShowComments = (postId, post) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
      if (!postComments[postId]) {
        fetchCommentsByPostId(postId, setPostComments, setIsLoading);
      }
    }
    setShowCommentsPopup(true);
  };

  function unsavedDone(unsaveMessage) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${unsaveMessage}`,
      showConfirmButton: false,
      timer: 1700,
      background: "#F8F9FA",
    });
  }

  const toggleSave = (postId) => {
    axios.post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setfailSaved(res.data.message);
      unsavedDone(res.data.message);
      setSavedItems(prevItems => prevItems.filter(item => item.postId !== postId && item.shareId !== postId));
      setunsve(false);
      setSavedPosts((prev) => {
        const updatedPosts = { ...prev };
        if (updatedPosts[postId]) delete updatedPosts[postId];
        else updatedPosts[postId] = true;
        return updatedPosts;
      });
    }).catch((err) => {
      console.error("❌ Error toggling save:", err);
    });
  };

  return (
    <div className="saved-container">
      <Navbar />
      <h2 className="saved-title">
        {isclose && <Savedpodcast onClose={() => setisclose(false)} />}
        <FaBookmark style={{ color: "#3362C8", cursor: "pointer" }} onClick={() => setisclose(!isclose)} /> Saved podcast
      </h2>

      <div className="saved-items-list">
        {savedItems.length > 0 ? (
          savedItems.map((post) => (
            <div key={post.shareId || post.postId} className="relative w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform p-4 mb-4">
              <button onClick={() => toggleSave(post.postId)} className="absolute top-3 right-3 text-gray-600 hover:text-red-600" title="Remove from saved">
                <CiCircleMinus className="text-2xl" />
              </button>

              <PostActions post={post} Id={post.postId} setEditPost={setEditPost} setEditTitle={setEditTitle} setEditImages={setEditImages} handleDeletePost={handleDeletePost} setData={getSaved} />

              <div className="flex gap-3 items-center mb-3">
                <img src={`${Domain}${post.userImage}`} alt={post.displayName || "Unknown User"} className="w-10 h-10 rounded-full" />
                <div>
                  {post.userId === id ? (
                    <Link to={`/profile`}><p className="font-semibold text-sm">{post.displayName || "Unknown User"}</p></Link>
                  ) : (
                    <Link to={`/profileusers/${post.userId}`}><p className="font-semibold text-sm">{post.displayName || "Unknown User"}</p></Link>
                  )}
                  <p className="text-xs text-gray-500">{new Date(post.createAt).toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-lg font-semibold text-gray-900 break-words mb-3">{post.title || ""}</p>

              {post.images.length > 0 && (
                <div className="flex justify-center flex-wrap gap-2 mb-4">
                  {post.images.map((image, index) => (
                    <img key={index} src={`${Domain}${image}`} className="w-80 h-auto object-cover rounded-md cursor-pointer hover:scale-105 transition-transform" alt="" onClick={() => setSelectedImage(`${Domain}${image}`)} />
                  ))}
                </div>
              )}

              <div className="flex justify-end items-center gap-4 text-gray-600 text-xl">
                <button onClick={() => handleShowComments(post.postId || post.shareId, post)} className={`flex items-center gap-1 ${selectedPostId === (post.postId || post.shareId) && showCommentsPopup ? "text-blue-600" : ""}`}>
                  <FontAwesomeIcon icon={faComment} />
                  {post.commentCount || 0}
                </button>
                <FontAwesomeIcon icon={faHeart} onClick={() => toggleLike(post, getSaved)} className={`cursor-pointer ${post.isLikedByCurrentUser ? "text-red-500" : "text-gray-400"}`} />
                <span onClick={() => fetchLikedUsers(post.postId || post.shareId, setLikedUsers, setCurrentLikedPostId, setShowLikesPopup)} className="cursor-pointer text-sm">
                  {post.likesCount || 0}
                </span>
              </div>

              {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                  <img src={selectedImage} alt="Full View" className="max-w-full max-h-full object-contain p-4" />
                </div>
              )}

              {(selectedPostId === post.postId || selectedPostId === post.shareId) && showCommentsPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
                    <button onClick={() => setShowCommentsPopup(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg font-bold" title="إغلاق">✕</button>
                    <Comment post={post} setShowCommentsPopup={setShowCommentsPopup} isLoading={isLoading} postComments={postComments} selectedPostId={selectedPostId} editComment={editComment} setEditComment={setEditComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} handleUpdateComment={handleUpdateComment} handleDeleteComment={handleDeleteComment} />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No saved items yet.</p>
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
                             {
                                         user?.userId ==id? (
                                               <Link to={`/profile`}>
                                          <p className="font-semibold text-sm">{user?.user.displayName || "Unknown User"}</p>
                                        </Link>
                                          ) : (
                                             <Link to={`/profileusers/${user?.userId}`}>
                                          <p className="font-semibold text-sm">{user?.user.displayName || "Unknown User"}</p>
                                        </Link>
                                        )
                                        }     
                            
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
    </div>
  );
};

export default Saved;