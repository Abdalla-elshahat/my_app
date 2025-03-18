
import React, { useState, useEffect, useContext } from 'react';
import './Posts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import AddPosts from './addposts/Addposts';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import axios from "axios";
import { Domain, token } from './../../utels/consts';
import Swal from 'sweetalert2';
import { SavedPostsContext } from '../../Contexts/SavedPostsContext';

const Posts = () => {
  const [sucessSaved, setSucessSaved] = useState("");
  const [Posts, setPosts] = useState([]);
  const { savedPosts, setSavedPosts } = useContext(SavedPostsContext);

    // Toggle Save/Unsave Post
    const toggleSave = (postId) => {
      axios
        .post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
          headers: { Authorization: `Bearer ${token}`},
        })
        .then((res) => {
          console.log(res.data)
          setSucessSaved(res.data.message); // Show success message
          setSavedPosts((prev) => {
            const updatedPosts = {
              ...prev,
              [postId]: res.data.data.isSaved, // Update the saved state for this post
            };
            localStorage.setItem("savedPosts", JSON.stringify(updatedPosts)); // Save to localStorage
            return updatedPosts;
          });
        })
        .catch((err) => {
          console.error("❌ Error toggling save:", err);
        });
    };
  
  const getAllPosts = async () => {
    try {
      const response = await fetch(`${Domain}/api/Share/posts-with-shares`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }
  
      const result = await response.json();
      setPosts(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // Show success message when a post is saved/unsaved
  useEffect(() => {
    if (sucessSaved) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${sucessSaved}`,
        showConfirmButton: false,
        timer: 1700,
        background: "#F8F9FA",
      });
    }
  }, [sucessSaved]);

  // Fetch saved posts from the backend on component mount
  useEffect(() => {
    axios.get(`${Domain}/api/SavedPost/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const savedPostIds = res.data.data;
      const savedState = savedPostIds.reduce((acc, postId) => {
        acc[postId] = true;
        return acc;
      }, {});
      setSavedPosts(savedState);
      localStorage.setItem("savedPosts", JSON.stringify(savedState)); // Save to localStorage
    })
    .catch((err) => {
      console.error("❌ Error fetching saved posts:", err);
    });
  }, [setSavedPosts]);

useEffect(() => {
  getAllPosts();
}, []);
const toggleLike = async (postId) => {
  try {
    const response = await fetch(`${Domain}/api/Like/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return;
    }

    setPosts((prevData) =>
      prevData.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: !post.isLiked ? post.likesCount + 1 : post.likesCount - 1,
            }
          : post
      )
    );
  } catch (error) {
    console.error("Error updating like:", error);
  }
};



  return (
    <div className='all-posts'>
      <AddPosts />
      <div className="posts">
        {Posts?.map((post) => (
          <div className="post" key={post.id}>
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-content">
              <div className='toppost'>
                <div className='left'>
                  <span>
                    <img src={`${Domain}/${post.authourimag}`} alt={post.author} className="post-author-image" />
                  </span>
                  <span>
                    <p className="post-author">{post.author}</p>
                    <p className='dateofpost'>{post.date}</p>
                  </span>
                </div>
                <div className='right'>
                  <FontAwesomeIcon icon={faShare} />
                  <FontAwesomeIcon icon={faComment} />
                  <FontAwesomeIcon icon={faHeart} />
                  {/* Save/Unsave Button */}
                  <button
                    className="save-btn"
                    onClick={() => toggleSave(post.id)}
                  >
                    {savedPosts[post.id] ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
              <h3 className="post-title">{post.title}</h3>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;