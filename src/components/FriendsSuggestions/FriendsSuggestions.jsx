import React from "react";
import "./FriendsSuggestions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const FriendsSuggestions = () => {
  const suggestions = [
    { id: 1, name: "Hend", image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" },
    { id: 2, name: "Anas", image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" },
    { id: 3, name: "Yahia", image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" },
    { id: 4, name: "Rana", image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" },
  ];

  return (
    <div className="friends-suggestions  hidden md:block">
      <h3 className="suggestions-title">Suggestions for you</h3>
      <ul className="suggestions-list">
        {suggestions.map((friend) => (
          <li key={friend.id} className="suggestion-item">
            <div className="friend-info">
              <img
                src={friend.image}
                alt={friend.name}
                className="friend-avatar"
              />
              <span className="friend-name">{friend.name}</span>
            </div>
            <FontAwesomeIcon icon={faUserPlus} className="add-friend-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsSuggestions;
