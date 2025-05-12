
import './Home.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import FriendsSuggestions from './components/FriendsSuggestions/FriendsSuggestions';
import PostsWithactions from './components/PostsR/posts&add';
function Home() {

  return (
    <div className="Home">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <PostsWithactions />
        <FriendsSuggestions />
      </div>

    </div>
  );
};

export default Home;
