import React from 'react';
import './Home.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Posts from './components/Posts/Posts';
import FriendsSuggestions from './components/FriendsSuggestions/FriendsSuggestions';
function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Posts />
        <FriendsSuggestions />
      </div>

    </div>
  );
};

export default Home;
