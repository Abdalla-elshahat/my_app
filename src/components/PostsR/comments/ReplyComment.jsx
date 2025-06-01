import { useEffect, useState } from "react";
import { token, Domain } from "../../../utels/consts.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReplyComment = ({ commentId, selectedPostId, onReplyAdded }) => {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);
  const [showTextarea, setShowTextarea] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyText, setEditReplyText] = useState("");
  
  let currentUserId = null;
  try {
    const decoded = jwtDecode(token);
    currentUserId = decoded.nameid;
  } catch (error) {
    console.error("Invalid token:", error);
  }

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(
          `${Domain}/api/Comment/Getcomment/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (response.ok) {
          const data =
            result.data && Array.isArray(result.data.replies)
              ? result.data.replies
              : [];

          const localRepliesKey = `replies_post_${selectedPostId}`;
          const localReplies =
            JSON.parse(localStorage.getItem(localRepliesKey)) || [];

          const mergedReplies = [
            ...data,
            ...localReplies.filter((r) => r.commentId === commentId),
          ];

          setReplies(mergedReplies);
        } else {
          console.error("Error fetching replies:", result);
        }
      } catch (error) {
        console.error("Failed to fetch replies:", error);
      }
    };

    fetchReplies();
  }, [commentId, selectedPostId]);

  function handleReplySubmit(commentId, userReply, postId) {
    if (!userReply.trim()) return;

    const body = {
      text: userReply,
      postId: postId,
    };

    axios
      .post(
        `${Domain}/api/Comment/Add-reply/${commentId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const result = res.data;

        const replyToSave = {
          id: result.id || Date.now(),
          text: userReply,
          commentId: commentId,
          postId: postId,
          user: result.user || {
            displayName: "You",
            pictureUrl: "",
            id: currentUserId,
          },
        };

        const localRepliesKey = `replies_post_${postId}`;
        const existingReplies =
          JSON.parse(localStorage.getItem(localRepliesKey)) || [];
        const updatedReplies = [...existingReplies, replyToSave];
        localStorage.setItem(localRepliesKey, JSON.stringify(updatedReplies));

        setReplies((prev) => [...prev, replyToSave]);
        setReplyText("");
        setShowTextarea(false);

        if (onReplyAdded) {
          onReplyAdded(replyToSave);
        }
      })
      .catch((err) => {
        console.error("Error submitting reply:", err);
      });
  }

  const handleDeleteReply = (replyId) => {
    const updatedReplies = replies.filter((r) => r.id !== replyId);
    setReplies(updatedReplies);

    const localRepliesKey = `replies_post_${selectedPostId}`;
    localStorage.setItem(localRepliesKey, JSON.stringify(updatedReplies));
  };

  const handleEditReply = (replyId, currentText) => {
    setEditingReplyId(replyId);
    setEditReplyText(currentText);
  };

  const handleUpdateReply = async () => {
    if (!editReplyText.trim()) return;

    try {
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

      const updatedReplies = replies.map((reply) =>
        reply.id === editingReplyId ? { ...reply, text: editReplyText } : reply
      );
      setReplies(updatedReplies);
      setEditingReplyId(null);
      setEditReplyText("");
    } catch (error) {
      console.error("Failed to update reply:", error);
    }
  };

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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={() => setShowTextarea(false)}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Replies:</h4>
          {replies.map((reply) => (
            <div key={reply.id} className="mb-2 p-3 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={`${Domain}${reply.user.pictureUrl}`}
                    alt={`${reply.user.displayName}'s profile`}
                    className="w-8 h-8 rounded-full"
                  />
                  <strong>{reply.user?.displayName || "Anonymous"}</strong>
                </div>

                {reply.user?.id === currentUserId && (
                  <div className="flex gap-2 text-gray-500 text-sm">
                    <button
                      onClick={() => handleEditReply(reply.id, reply.text)}
                      title="Edit"
                      className="text-blue-600"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteReply(reply.id)}
                      title="Delete"
                      className="text-red-600"
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
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setEditingReplyId(null);
                        setEditReplyText("");
                      }}
                      className="text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm mt-1">{reply.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReplyComment;
