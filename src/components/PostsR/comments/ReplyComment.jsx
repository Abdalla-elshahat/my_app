import { useContext, useEffect, useState } from "react";
import { token, Domain } from "../../../utels/consts.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { LearningDataContext } from "../../../Contexts/LearningData.jsx";

const ReplyComment = ({ commentId, selectedPostId, onReplyAdded }) => {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get current user ID from token
  let currentUserId = null;
  let currentUserName = null;
  const { id  } = useContext(LearningDataContext);
  try {
    const decoded = jwtDecode(token);
    currentUserId = decoded.nameid;
    currentUserName = decoded.unique_name || decoded.name || "Current User";
  } catch (error) {
    console.error("Invalid token:", error);
  }

  const fetchReplies = async () => {
    if (!commentId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${Domain}/api/Comment/Getcomment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response for replies:", response.data);

      // Handle different response structures
      let fetchedReplies = [];

      if (response.data?.data?.replies) {
        // Most likely structure - replies are in a "replies" property
        fetchedReplies = Array.isArray(response.data.data.replies)
          ? response.data.data.replies
          : [response.data.data.replies];
      } else if (Array.isArray(response.data.data)) {
        // Alternative - replies might be the data array itself
        fetchedReplies = response.data.data;
      } else if (response.data.replies) {
        // Another possibility - replies directly in the root
        fetchedReplies = Array.isArray(response.data.replies)
          ? response.data.replies
          : [response.data.replies];
      }

      // Filter out any undefined or null replies
      fetchedReplies = fetchedReplies.filter((reply) => reply);

      setReplies(fetchedReplies);
    } catch (error) {
      console.error("Failed to fetch replies:", error);
      setError("Failed to load replies. Please try again later.");
      setReplies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (commentId) {
      fetchReplies();
    }
  }, [commentId]);

  function handleReplySubmit(commentId, userReply, postId) {
    if (!userReply.trim()) return;

    setIsLoading(true);

    const body = {
      text: userReply,
      postId: postId,
    };

    axios
      .post(`${Domain}/api/Comment/Add-reply/${commentId}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchReplies();
        setReplyText("");
        setShowTextarea(false);
        if (onReplyAdded) {
          console.log("Reply added:", res.data.user);
          onReplyAdded(res.data.user);
        }
      })
      .catch((err) => {
        console.error("Error submitting reply:", err);
        setError("Failed to submit reply. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleDeleteReply = async (replyId) => {
    try {
      setIsLoading(true);

      await axios.delete(`${Domain}/api/Comment/Deletecomment/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );
    } catch (error) {
      console.error("Failed to delete reply:", error);
      setError("Failed to delete reply. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditReply = (replyId, currentText) => {
    setEditingReplyId(replyId);
    setEditReplyText(currentText);
  };

  const handleUpdateReply = async () => {
    if (!editReplyText.trim()) return;

    try {
      setIsLoading(true);

      await axios.put(
        `${Domain}/api/Comment/Editcomment/${editingReplyId}`,
        { text: editReplyText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the reply in the current state
      setReplies((prevReplies) =>
        prevReplies.map((reply) =>
          reply.id === editingReplyId
            ? { ...reply, text: editReplyText }
            : reply
        )
      );

      // Reset editing state
      setEditingReplyId(null);
      setEditReplyText("");
    } catch (error) {
      console.error("Failed to update reply:", error);
      setError("Failed to update reply. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to extract user display name from reply
  const getUserDisplayName = (reply) => {

    // Check all possible paths to find the username
    if (reply.user?.displayName) return reply.user.displayName;
    if (reply.user?.userName) return reply.user.userName;
    if (reply.user?.username) return reply.user.username;
    if (reply.user?.name) return reply.user.name;
    if (reply.userName) return reply.userName;
    if (reply.username) return reply.username;
    if (reply.displayName) return reply.displayName;
    return "Unknown User";
  };

  // Function to get user profile picture URL
  const getUserPictureUrl = (reply) => {
    if (!reply) return null;

    // Check all possible paths to find the profile picture
    let picturePath = null;

    if (reply.user?.pictureUrl) picturePath = reply.user.pictureUrl;
    else if (reply.user?.profilePicture) picturePath = reply.user.profilePicture;
    else if (reply.user?.avatar) picturePath = reply.user.avatar;
    else if (reply.pictureUrl) picturePath = reply.pictureUrl;
    else if (reply.profilePicture) picturePath = reply.profilePicture;
    else if (reply.avatar) picturePath = reply.avatar;

    if (!picturePath) return null;

    // Handle URL formatting
    if (picturePath.startsWith("http")) return picturePath;
    return `${Domain}${picturePath}`;
  };

  // Function to get user ID

  return (
    <div className="p-4 border-t mt-4">
      
      {!showTextarea ? (
        
        <button
          onClick={() => setShowTextarea(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Reply
        </button>
      ) : (
        <>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="rounded-lg border p-2 w-full mb-2 text-gray-700"
          />
          <div className="flex gap-2">
            <button
              onClick={() =>
                handleReplySubmit(commentId, replyText, selectedPostId)
              }
              disabled={isLoading}
              className={`${
                isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 rounded-lg`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={() => setShowTextarea(false)}
              className="text-gray-500 text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {isLoading && replies.length === 0 && (
        <div className="mt-4 text-sm text-gray-500">Loading replies...</div>
      )}

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {replies && replies.length > 0 ? (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <h4 className="font-semibold mb-2 text-sm text-gray-700">
            Replies ({replies.length}):
          </h4>
          {replies.map((reply) => {
            const userName = getUserDisplayName(reply);
            const userPictureUrl = getUserPictureUrl(reply);
            const userId = reply.userId;
            const isCurrentUser = userId === currentUserId;
            return (
              <div
                key={reply.id || Math.random()}
                className="mb-2 p-3 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {userPictureUrl ? (
                      <img
                        src={userPictureUrl}
                        alt={`${userName}'s profile`}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          {userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {userId ? (
                          <Link
                            to={
                              isCurrentUser
                                ? "/profile"
                                : `/profileusers/${userId}`
                            }
                            className="hover:underline text-blue-600"
                          >
                            {userName} {isCurrentUser ? "(You)" : ""}
                          </Link>
                        ) : (
                          <span>{userName}</span>
                        )}
                      </span>
                      {reply.createdAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {reply.userId === id && (
                    <div className="flex gap-2 text-gray-500 text-sm">
                      <button
                        onClick={() => handleEditReply(reply.id, reply.text)}
                        title="Edit"
                        className="text-blue-600"
                        disabled={isLoading}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        title="Delete"
                        className="text-red-600"
                        disabled={isLoading}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>
{editingReplyId === reply.id ? (
  <div className="mt-2">
    <textarea
      value={editReplyText}
      onChange={(e) => setEditReplyText(e.target.value)}
      className="w-full p-2 border rounded-lg"
    />
    <div className="flex gap-2 mt-1">
      <button
        onClick={handleUpdateReply}
        className={`${
          isLoading ? "bg-green-300" : "bg-green-500"
        } text-white px-4 py-2 rounded-lg`}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
      <button
        onClick={() => {
          setEditingReplyId(null);
          setEditReplyText("");
        }}
        className="text-sm text-gray-600"
        disabled={isLoading}
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <p className="text-sm mt-1">{reply.text}</p>
)}

              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="mt-2 text-sm text-gray-500">No replies yet</div>
        )
      )}
    </div>
  );
};

export default ReplyComment;
