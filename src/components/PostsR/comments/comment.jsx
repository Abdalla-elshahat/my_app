import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Domain, Id } from "../../../utels/consts";
import ReplyComment from "./ReplyComment";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Comment=(props)=>{
    const { post, isLoading, postComments, selectedPostId, editComment, setEditComment, editCommentText, setEditCommentText, handleUpdateComment, handleDeleteComment } = props;
      const handleEditComment = (comment) => {
    setEditComment(comment);
    setEditCommentText(comment.text);
  };
    return(
        <>
             <div className="comments-section">
                        {isLoading ? (
                          <p>Loading comments...</p>
                        ) : postComments[post.shareId || post.postId]?.length > 0 ? (
                          postComments[post.shareId || post.postId].map((comment) => (
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
                                  src={`${Domain}${comment.user.pictureUrl}`}
                                  alt={`${comment.user.displayName}'s profile`}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                  }}
                                />
                                <strong>{comment.user.displayName}</strong>
                              </div>
        
                              {editComment?.id === comment.id ? (
                                <>
                                  <textarea
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    className="w-full p-2 border rounded mt-1 mb-1"
                                  />
                                  <div className="flex gap-2 mb-2">
                                    <button
                                      onClick={(e)=>handleUpdateComment(editComment,editCommentText, selectedPostId,setEditComment,setEditCommentText)}
                                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditComment(null);
                                        setEditCommentText("");
                                      }}
                                      className="text-gray-500 px-3 py-1 hover:underline"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <p>{comment.text}</p>
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
                                    onClick={() => handleDeleteComment(comment.id,selectedPostId)}
                                    className="delete-comment-btn text-red-500"
                                    title="Delete comment"
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              )}
        
                              {/* Reply Component */}
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
                      </div>
        </>
    )
}
export default Comment