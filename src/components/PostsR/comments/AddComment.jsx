import React, { useState } from "react";
import { token, Domain, Id } from "../../../utels/consts";
import ReplyComment from "./ReplyComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const AddComment = ({ postId, shareId }) => {
  const [text, setText] = useState("");
  const [newComments, setNewComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(
    postId || shareId || null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = { text };
    if (postId) commentData.postId = postId;
    if (shareId) commentData.shareId = shareId;

    try {
      const response = await fetch(
        `${Domain}/api/Comment/Addcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      const result = await response.json();
      console.log("My Result", result);
      if (!response.ok) {
        console.error("Failed to post comment: ", result);
        return;
      }

      setNewComments((prev) => [...prev, result]);
      setText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = (id) => {
    setNewComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  };

  const handleSaveEditedComment = (id) => {
    setNewComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, text: editedText } : comment
      )
    );
    setEditingCommentId(null);
    setEditedText("");
  };


  return (
    <div className="add-comment-container p-2 border-t mt-2">


      <div className="comments-list space-y-2">
        {newComments.map((comment) => (
          <div key={comment.id} className="comment">
            <div
              className="comment-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src={
                  comment.user?.pictureUrl
                    ? `${Domain}${comment.user.pictureUrl}`
                    : "/default-user.png"
                }
                alt={`${comment.user?.displayName || "User"}'s profile`}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
              <strong>{comment.user?.displayName || "Unknown User"}</strong>
            </div>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-2 border rounded mt-1 mb-1"
                />
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleSaveEditedComment(comment.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditedText("");
                    }}
                    className="text-gray-500 px-3 py-1 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <h1 className="p-2 text-center">{comment.text}</h1>
            )}

            {comment.userId === Id && (
              <div className="comment-actions mt-1 flex gap-2">
                <button
                  onClick={() => handleEditComment(comment)}
                  className="edit-comment-btn text-blue-500"
                  title="Edit comment"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="delete-comment-btn text-red-500"
                  title="Delete comment"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}

            <ReplyComment
              commentId={comment.id}
              selectedPostId={selectedPostId}
              onReplyAdded={(newReply) => {
                console.log("New reply:", newReply);
              }}
            />
          </div>
        ))}
      </div>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
