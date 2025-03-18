import { React, useEffect, useState } from "react";
import SavedItemCard from "./SavedItemCard";
import "./Saved.css";
import { FaBookmark } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Domain, token } from './../../utels/consts';

const Saved = () => {
  
  const [savedItems, setSavedItems] = useState([]);

  // ✅ Fetch saved posts
  function getSaved() {
    axios
      .get(`${Domain}/api/SavedPost/saved-posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Saved items:", res.data.data);
        console.log(res.data.data)
        setSavedItems(res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching saved items:", err);
      });
  }

  // ✅ Toggle Save/Unsave Post
  function toggleSave(postId) {
    axios
      .post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log(`🔄 Toggled save for post ID: ${postId}`);
        getSaved(); // Refresh saved items
      })
      .catch((err) => {
        console.error("❌ Error toggling save:", err);
      });
  }

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <div className="saved-container">
      <Navbar />
      <h2 className="saved-title">
        <FaBookmark style={{ color: "#3362C8" }} /> Saved items
      </h2>

      <div className="saved-items-list">
        {savedItems.length > 0 ? (
          savedItems?.map((item) => (
            <SavedItemCard
              key={item.id}
              {...item}
              getSaved = {getSaved}
              onToggleSave={() => toggleSave(item.id)} // Pass function to child component
            />
          ))
        ) : (
          <p>No saved items yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
