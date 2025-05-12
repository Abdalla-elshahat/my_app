import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Domain, Id } from "../../../utels/consts";
import ReplyComment from "./ReplyComment";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddComment from "./AddComment";

const Comment = (props) => {
  const {
    post,
    isLoading,
    postComments,
    selectedPostId,
    editComment,
    setEditComment,
    editCommentText,
    setEditCommentText,
    handleUpdateComment,
    handleDeleteComment,
    setShowCommentsPopup,
  } = props;

  const handleEditComment = (comment) => {
    setEditComment(comment);
    setEditCommentText(comment.text);
  };

  return (
    <div className="comments-section space-y-4">
      {isLoading ? (
        <p>Loading comments...</p>
      ) : postComments[post.shareId || post.postId]?.length > 0 ? (
        postComments[post.shareId || post.postId].map((comment) => (
          <div
            key={comment.id}
            className="comment bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <div className="comment-header flex items-center gap-3 mb-2">
              <img
                src={`${Domain}${comment.user.pictureUrl}`}
                alt={`${comment.user.displayName}'s profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <strong className="text-sm font-medium">
                  {comment.user.displayName}
                </strong>
                <p className="text-xs text-gray-500">{comment.user.email}</p>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editComment?.id === comment.id ? (
                  <>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md mb-2"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateComment(
                            editComment,
                            editCommentText,
                            selectedPostId,
                            setEditComment,
                            setEditCommentText
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditComment(null);
                          setEditCommentText("");
                        }}
                        className="text-gray-500 hover:underline px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-md text-gray-800">{comment.text}</p>
                )}
              </div>

              {comment.userId === Id && (
                <div className="comment-actions flex flex-col items-center gap-2 pl-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit comment"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteComment(comment.id, selectedPostId)
                    }
                    className="text-red-500 hover:text-red-600"
                    title="Delete comment"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            <ReplyComment
              commentId={comment.id}
              selectedPostId={selectedPostId}
              onReplyAdded={(newReply) => {
                console.log("New reply:", newReply);
              }}
            />
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
                  <AddComment
                    postId={post.postId}
                    shareId={post.shareId}
                  />
    </div>
  );
};

export default Comment;
