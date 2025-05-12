import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import FriendsSuggestions from './components/FriendsSuggestions/FriendsSuggestions';
import PostsWithactions from './components/PostsR/posts&add';
import { getAllPosts } from './apicalls/posts';
function Home() {
  const [sharedPosts, setSharedPosts] = useState([]);
  useEffect(() => {
    getAllPosts(setSharedPosts);
  },[sharedPosts,setSharedPosts])
  return (
    <div className="Home">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <PostsWithactions sharedPosts={sharedPosts}/>
        <FriendsSuggestions />
      </div>

    </div>
  );
};

export default Home;
