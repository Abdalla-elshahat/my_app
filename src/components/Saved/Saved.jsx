import { React } from "react";
import SavedItemCard from "./SavedItemCard";
import "./Saved.css";
import srcProfile from "./BEN-KIERMAN.jpg";
import { FaBookmark, FaRegBell } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
const Saved = () => {
  const savedItems = [
    {
      id: 111,
      name: "Jain",
      date: "Dec 8",
      content: "How to Build Your Frontend Apps 10x Faster !",
      reactions: 30,
      comments: 29,
      profileImage: "https://i.pravatar.cc/46", // Replace with actual image
    },
    {
      id: 222,
      name: "Noor",
      date: "Dec 5",
      content: "What was your win this week?",
      reactions: 26,
      comments: 30,
      profileImage: "https://i.pravatar.cc/48",
    },
    {
      id: 333,
      name: "Islam",
      date: "Nov 30",
      content: "Top AI Search Engines for Business and Startups in 2025",
      reactions: 22,
      comments: 18,
      profileImage: "https://i.pravatar.cc/49",
    },
  ];

  return (
    <div className="saved-container">
  <Navbar/>

      <h2 className="saved-title">
        <FaBookmark style={{ color: "#3362C8" }} /> Saved items
      </h2>

      <div className="saved-items-list">
        {savedItems.map((item, index) => (
          <SavedItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Saved;
