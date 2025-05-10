import React, { useEffect, useRef, useState } from "react";
import "./HeroSection.css";
import {  togglePlay } from "../../apicalls/podcasts";
import { CgPlayPause } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [datapodcast, setDatapodcast] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(new Audio());
  const rawData = localStorage.getItem("datapodcast");
  useEffect(() => {
    try {
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        setDatapodcast(parsedData);

        if (parsedData.audioUrl) {
          audioRef.current.src = parsedData.audioUrl;
          audioRef.current.load();
        }
      }
    } catch (error) {
      console.error("Error parsing datapodcast:", error);
    }
  }, []);
  

  if (!datapodcast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero-section gap-2">
      <div className="hero-content">
        <h2>{datapodcast.title}</h2>
        <button className="play-now" onClick={() => togglePlay(setIsPlay, audioRef, isPlay, datapodcast)}>
          <span>
                   {isPlay ? (
                        <CgPlayPause className="text-2xl" />
                      ) : (
                        <FaPlay className="text-2xl" />
                      )}
          </span>
          <span >{isPlay?"Stop now":"play now"}</span>
        </button>
      </div>
      <div className="hero-image ">
        <Link to={`/Podcasts/${datapodcast.id}`}>
          <img src={datapodcast.imageUrl} className="rounded-lg" alt="Learning AI" />
        </Link>
      </div>
    </div>
  );
};


export default HeroSection;
