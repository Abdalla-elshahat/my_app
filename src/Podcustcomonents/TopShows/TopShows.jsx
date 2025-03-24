import React, { use, useEffect, useState } from "react";
import "./TopShows.css";
import Catpodcast from "../catpodcasts";
import { gettopshows } from "../../apicalls/podcasts";
const TopShows = () => {
  const [topshows, settopshows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // تخزين الفئة المختارة
useEffect(()=>{
gettopshows(settopshows);
},[])
  return (
    <div className="top-shows">
      <h3>Top Shows</h3>
      <div className="shows-container">
        {topshows.map((show) => (
          <div key={show.id} className="show-card"  onClick={() => setSelectedCategory(show.name)}>
            <img src={show.image} alt={show.name} />
            <p>{show.name}</p>
          </div>
        ))}
      </div>
      {selectedCategory && <Catpodcast data={selectedCategory} onClose={() => setSelectedCategory(null)}/>}
    </div>
  );
};

export default TopShows;
