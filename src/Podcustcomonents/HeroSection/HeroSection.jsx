import React from "react";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h2>Learning AI (Matt Eland)</h2>
        <button className="play-now">
          <span>
            <FontAwesomeIcon icon={faCirclePlay} />
          </span>
          <span>play now</span>
        </button>
      </div>
      <div className="hero-image">
        <img src="/images/bro.png" alt="Learning AI" />
      </div>
    </div>
  );
};

export default HeroSection;
