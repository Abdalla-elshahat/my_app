import React from "react";
import "./Profile.css";
import srcProfile from "./imageProfile/BEN-KIERMAN.jpg";
import { FaShare, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
// Profile Component
function Profile() {
  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="header">
        <div className="profile-info">
          <div className="profile-image">
            <img src={srcProfile} alt="Profile" className="avatar" />
          </div>
          <div>
            <h2>Ismail</h2>
            <p>
              <CiLocationOn /> Egypt, Cairo
            </p>
            <p>UX/UI Designer</p>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
        <div className="stats">
          <div>
            <h3>250</h3>
            <p className="lightAction">posts</p>
          </div>
          <div>
            <h3>2022</h3>
            <p className="lightAction">followers</p>
          </div>
          <div>
            <h3>590</h3>
            <p className="lightAction">following</p>
          </div>
        </div>
      </div>

      {/* Skills, Learning, and Interests */}
      <div className="side-section">
        <Card
          title="Skills"
          content="Figma, Photoshop, Adobe XD, After Effect"
        />
        <Card
          title="Currently Learning"
          content="Wire-framing, Prototyping, Motion Design"
        />
        <Card title="My Interests" content="Sports, Books, Languages, Movies" />
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <Post
          date="Nov 30"
          title="Top 10 UI/UX Design Conferences in 2025"
          reactions="36 reactions"
          comments="22 comments"
        />

        <Post
          date="Nov 4"
          title="Is Wireframing and Figma Still Necessary for No-Code Websites?"
          reactions="24 reactions"
          comments="16 comments"
        />
        <Post
          date="Nov 1"
          title="5 Free Courses/Certifications to learn UX Design"
          reactions="35 reactions"
          comments="9 comments"
        />
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, content }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

// Reusable Post Component
function Post({ date, title, reactions, comments }) {
  return (
    <div className="post-card">
      <div className="person">
        <div>
          <img src={srcProfile} className="avatarPost" alt="" />
        </div>
        <div>
          <h5 className="namePerson">Ismail</h5>
          <p className="date">{date}</p>
        </div>
      </div>

      <h4>{title}</h4>
      <div className="actionsPost">
        <div className="post-stats">
          <span>{reactions}</span>
          <span>{comments}</span>
        </div>
        <Icons />
      </div>
    </div>
  );
}
function Icons() {
  return (
    <div className="icons">
      <span>
        <FaShare />
      </span>
      <span>
        <FaRegComment />
      </span>
      <span>
        <FaRegHeart />
      </span>
    </div>
  );
}

export default Profile;
