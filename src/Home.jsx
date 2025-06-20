import './Home.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import PostsWithactions from './components/PostsR/posts&add';
import ProgrammingAds from './components/FriendsSuggestions/ProgrammingAds';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="posts-scroll-area"><PostsWithactions /></div>
        <ProgrammingAds />
      </div>
    </div>
  );
}

export default Home;
