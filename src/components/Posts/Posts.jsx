
import React, { useState, useEffect, useContext } from 'react';
import './Posts.css';
import AddPosts from './addposts/Addposts';
import Swal from 'sweetalert2';
import { SavedPostsContext } from '../../Contexts/SavedPostsContext';
import Postsusers from './postsusers';
import { getAllPosts } from '../../apicalls/posts';

const Posts = () => {
  const [sucessSaved, setSucessSaved] = useState("");
  const [Posts, setPosts] = useState([]);
  const { savedPosts, setSavedPosts } = useContext(SavedPostsContext);

    // Toggle Save/Unsave Post
    // const toggleSave = (postId) => {
    //   axios
    //     .post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
    //       headers: { Authorization: `Bearer ${token}`},
    //     })
    //     .then((res) => {
    //       console.log(res.data)
    //       setSucessSaved(res.data.message); // Show success message
    //       setSavedPosts((prev) => {
    //         const updatedPosts = {
    //           ...prev,
    //           [postId]: res.data.data.isSaved, // Update the saved state for this post
    //         };
    //         localStorage.setItem("savedPosts", JSON.stringify(updatedPosts)); // Save to localStorage
    //         return updatedPosts;
    //       });
    //     })
    //     .catch((err) => {
    //       console.error("❌ Error toggling save:", err);
    //     });
    // };
  
  // Show success message when a post is saved/unsaved
  // useEffect(() => {
  //   if (sucessSaved) {
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: `${sucessSaved}`,
  //       showConfirmButton: false,
  //       timer: 1700,
  //       background: "#F8F9FA",
  //     });
  //   }
  // }, [sucessSaved]);

  // Fetch saved posts from the backend on component mount
  // useEffect(() => {
  //   axios.get(`${Domain}/api/SavedPost/list`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //   .then((res) => {
  //     const savedPostIds = res.data.data;
  //     const savedState = savedPostIds.reduce((acc, postId) => {
  //       acc[postId] = true;
  //       return acc;
  //     }, {});
  //     setSavedPosts(savedState);
  //     localStorage.setItem("savedPosts", JSON.stringify(savedState)); // Save to localStorage
  //   })
  //   .catch((err) => {
  //     console.error("❌ Error fetching saved posts:", err);
  //   });
  // }, [setSavedPosts]);
  // const toggleLike = async (postId) => {
  //   try {
  //     const response = await fetch(`${Domain}/api/Like/like`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ postId }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.log(errorData);
  //       return;
  //     }
  
  //     setPosts((prevData) =>
  //       prevData.map((post) =>
  //         post.id === postId
  //           ? {
  //               ...post,
  //               isLiked: !post.isLiked,
  //               likesCount: !post.isLiked ? post.likesCount + 1 : post.likesCount - 1,
  //             }
  //           : post
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating like:", error);
  //   }
  // };
useEffect(() => {
  getAllPosts(setPosts);
}, []);

  return (
    <div className='all-posts'>
      <AddPosts />
      <div className="posts">
      <Postsusers posts={Posts}/>
      </div>
    </div>
  );
};

export default Posts;