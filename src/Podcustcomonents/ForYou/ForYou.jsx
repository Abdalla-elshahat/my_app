import React, { useEffect, useState } from "react";
import "./ForYou.css";
import Catpodcast from "../catpodcasts";
import { getforyou } from "../../apicalls/podcasts";

const ForYou = () => {
const [foryou, setforyou] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getforyou(setforyou);
  }, []);

  return (
    <div className="for-you">
      <h3>For You</h3>
      <ul>
        {foryou.map((item) => (
          <li
            key={item.id}
            className="for-you-item"
            onClick={() => setSelectedCategory(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      {/* عرض Catpodcast فقط إذا تم اختيار فئة */}
      {selectedCategory && <Catpodcast data={selectedCategory} onClose={() => setSelectedCategory(null)}/>}
    </div>
  );
};

export default ForYou;
