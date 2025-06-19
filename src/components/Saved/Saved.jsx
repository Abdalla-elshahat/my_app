import { React, useEffect, useState } from "react";
import SavedItemCard from "./SavedItemCard";
import "./Saved.css";
import { FaBookmark } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { Domain, token } from './../../utels/consts';
import Savedpodcast from "./savedpodcasts";
const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [isclose, setisclose] = useState(false);
  function getSaved() {
    axios
      .get(`${Domain}/api/SavedPost/saved-posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSavedItems(res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching saved items:", err);
      });
  }

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <div className="saved-container">
      <Navbar />
      <h2 className="saved-title">
      {isclose && <Savedpodcast onClose={() => setisclose(false)} />}
       <FaBookmark style={{ color: "#3362C8",cursor:"pointer"}}  onClick={()=>setisclose(!isclose)}/> Saved podcast
      </h2>

      <div className="saved-items-list">
        {savedItems.length > 0 ? (
          savedItems?.map((item) => (
            <SavedItemCard key={item.id} {...item} getSaved = {savedItems} />
          ))
        ) : (
          <p>No saved items yet.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
