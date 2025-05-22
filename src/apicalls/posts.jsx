import { toast } from "react-toastify";
import { Domain, token } from "../utels/consts";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
export const getAllPosts = async (setData) => {
  try {
    const response = await fetch(`${Domain}/api/Share/posts-with-shares`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
   
    setData(result.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
export const handleSubmit = async (e, title, images, setTitle, setImages, setLoading, setMessage, onPostAdded) => {
  e.preventDefault();

  if (!title.trim()) {
    setMessage("Please enter content before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    setLoading(true);
    const response = await fetch(`${Domain}/api/Post/CreatePost`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      setMessage("Post created successfully!");
      setTitle("");
      setImages([]);
      if (onPostAdded) {
        onPostAdded();
      }
    } else {
      setMessage(result.message || "Something went wrong.");
    }
  } catch (error) {
    setMessage("Error creating post.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};
export const fetchLikedUsers = async (postId, setLikedUsers, setCurrentLikedPostId, setShowLikesPopup) => {
  try {
    const response = await fetch(`${Domain}/api/Like/likes-by-id/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      toast.error("Failed to fetch likes");
      return;
    }

    const result = await response.json();
    setLikedUsers(result.data.likes);
    setCurrentLikedPostId(postId);
    setShowLikesPopup(true);
  } catch (error) {
    console.error("Error fetching liked users:", error);
    toast.error("Failed to fetch likes");
  }
};
export const toggleLike = async (post, setData) => {
  try {
    const isShared = post.type === "Share";
    const body = isShared
      ? { shareId: post.shareId }
      : { postId: post.postId };

    const response = await fetch(`${Domain}/api/Like/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    const postKey = isShared
      ? `share_${post.shareId}`
      : `post_${post.postId}`;
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

    const newIsLiked = !post.isLiked;
    const newLikesCount = newIsLiked
      ? post.likesCount + 1
      : post.likesCount - 1;

    likedPosts[postKey] = {
      isLiked: newIsLiked,
      likesCount: newLikesCount,
    };
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    // Update only the clicked post, not any original/shared versions
    setData((prevData) =>
      prevData.map((p) => {
        const match =
          (isShared && p.shareId === post.shareId) ||
          (!isShared && p.postId === post.postId);

        return match
          ? {
            ...p,
            isLiked: newIsLiked,
            likesCount: newLikesCount,
          }
          : p;
      }),
    );
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
export const handleUpdatePost = async (editPost, editTitle, editImages, setEditPost) => {
  console.log(editPost);
  if (!editPost) return;

  const formData = new FormData();
  formData.append("title", editTitle);
  editImages.forEach((img) => formData.append("images", img));
  const postIdentifier = editPost.postId;
  try {
    const response = await fetch(`${Domain}/api/Post/${postIdentifier}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Update error:", err);
      return;
    }

    alert("Post updated!");
    setEditPost(null);
    getAllPosts();
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
export const handleDeletePost = async (postId, setData) => {
  const confirmation = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (!confirmation) return;

  try {
    const response = await fetch(`${Domain}/api/Post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Delete error:", result);
      toast.error(result?.message || "Failed to delete post.");
      return;
    }

    toast.success("Post deleted successfully!");
    setData((prevData) => prevData.filter((post) => post.postId !== postId));
  } catch (error) {
    console.error("Error deleting post:", error);
    // toast.error("Something went wrong. Please try again later.");
  }
};
// Fetch comments for a specific post
export const fetchCommentsByPostId = async (postId, setPostComments) => {
  if (!postId) {
    console.error("Invalid postId:", postId);
    return;
  }

  try {
    const response = await fetch(
      `http://arabdevcommunity.runasp.net/api/Comment/Getcomments/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response was successful before parsing JSON
    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        "Error fetching comments:",
        errorData.message || "Unknown error"
      );
      return;
    }

    const data = await response.json();

    setPostComments((prevComments) => ({
      ...prevComments,
      [postId]: data.data,
    }));

    console.log("Comments for post:", data.data);
  } catch (err) {
    console.error("Fetch error:", err);}
};
export const handleDeleteComment = async (commentId, selectedPostId) => {
  const confirmation = window.confirm(
    "Are you sure you want to delete this comment?"
  );
  if (!confirmation) return;

  try {
    const response = await fetch(
      `http://arabdevcommunity.runasp.net/api/Comment/Deletecomment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to delete comment");
    }

    toast.success("Comment deleted successfully!");

    // Refresh comments for the current post
    if (selectedPostId) {
      fetchCommentsByPostId(selectedPostId);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error(error.message || "Failed to delete comment");
  }
};
export const handleUpdateComment = async (editComment, editCommentText, selectedPostId, setEditComment, setEditCommentText) => {
  if (!editComment || !editCommentText.trim()) return;

  try {
    // Ensure selectedPostId is a string or number before using it
    let post;
    if (typeof selectedPostId === "string") {
      // const [type, id] = selectedPostId.split("_");
      const [type, id] = selectedPostId;
      post = {
        type: type === "share" ? "Share" : "Post",
        postId: type === "post" ? id : undefined,
        shareId: type === "share" ? id : undefined,
      };
    } else if (typeof selectedPostId === "number") {
      post = {
        postId: selectedPostId, // directly use number for postId
      };
    } else {
      // If selectedPostId is neither string nor number, handle error
      console.error("Invalid selectedPostId type:", selectedPostId);
      toast.error("Invalid selectedPostId");
      return;
    }

    const response = await fetch(
      `${Domain}/api/Comment/Editcomment/${editComment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: editCommentText.trim(),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.message || "Failed to edit comment");
      return;
    }
    await fetchCommentsByPostId(selectedPostId);
    toast.success("Comment updated successfully!");

    // Reset editing state
    setEditComment(null);
    setEditCommentText("");
  } catch (error) {
    console.error("Error editing comment:", error);
    toast.error("Failed to edit comment");
  }
};
export const handleShare = async (post, shareText, setData, setIsShareModalOpen, setShareText) => {
  try {
    const response = await fetch(
      `${Domain}/api/Share/sharepost/${post.shareId || post.postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: shareText || "",
          originalPostId: post.postId || post.shareId,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Error sharing post:", result);
      toast.error(result?.message || "Failed to share post.");
      return;
    }

    toast.success("Post shared successfully!");

    setData((prevData) =>
      prevData.map((item) =>
        item.postId === post.postId || item.shareId === post.shareId
          ? { ...item, sharesCount: (item.sharesCount || 0) + 1 }
          : item
      )
    );

    setData((prevData) => [
      {
        ...result.data,
        likesCount: 0,
        sharesCount: 0,
        commentCount: 0,
        isLiked: false,
        type: "Share",
        sharedFrom: post,
      },
      ...prevData,
    ]);

    setIsShareModalOpen(false);
    setShareText("");
  } catch (error) {
    console.error("Network or server error while sharing post:", error);
    toast.error("Something went wrong. Please try again later.");
  }
};
export const saveandunsavedPost = async (id, setData) => {
  try {
    const response = await fetch(`${Domain}/api/SavedPost/toggle-save/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(
        `Error following user: ${errorData.message || "Unknown error"}`,
        {
          icon: <FaExclamationCircle color="red" />,
        }
      );
      return;
    }
    const result = await response.json();
    setData(result);

    toast.success(result.message, {
      icon: <FaCheckCircle color="green" />,
    });
  } catch (error) {
    console.log(error);
  }
};