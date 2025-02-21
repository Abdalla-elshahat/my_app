import React from "react";
import "./FriendsSuggestions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const FriendsSuggestions = () => {
  const suggestions = [
    { id: 1, name: "Hend", image: "https://s3-alpha-sig.figma.com/img/8e2d/5bcb/44df5cb0b3eb50296d53dd2bead6e45d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W2Jc2PHDke7gcGO3uBW088rSkm7CdKnhBmgo4Z7SPgJ-5GxBk1-EI30evJ9fG-P7R3aJHy9XhLfNQfKPRsu28lBZYSnIl6njTQSZKemTtLpFbtvfEzwIncaWOkdQ3-~l1Q8AWn2pO7I51s9OhKKWKWPGA2B7blHKFQx-ZN9piqAy0CTTHVnjxF65Qcx0HKemMNngPnX2ATQ8T5aPPkyskR25fpYQv7830tpiTde5TrLtjoUpjOs0RZF7RwfR1d3TeLHJ-L7nKZX0qAYwA5sV4z4p~pohCWx5Ttjz6sRU5SWWx6laFqCcS7RDuZH80O-rbW3o~4pGe5Y2Gyl2YFqB1A__" },
    { id: 2, name: "Anas", image: "https://s3-alpha-sig.figma.com/img/8bba/4789/fbfb5ceb4a1bdf786a0028211ec3f12f?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fjyOluYvq9dNwCMHl3TtjetZ2k~xMgC3UbR~1sjmDe9MOi4Jd1VqdAnv4XwbCctAE6rHhWKX2KmBzlPiH4iG9Ww1N86BkMA9g~tc0nV5KcMKYTWA~2cHHsASchuYoNob0BHnROEv6W5Sn7trczxxe0sRRzfusYr9n~gj5p4HJf0Fe3-7AW04abCoRToche5iZPX5c3zoQudkKd9di-RfCJfiGWHbOVX6xyae4pPTzJg2gWc2cDKJMjeQUvv4omKXWICaPLiX3XcFvTeP3XJGC9dCUiZPZgYkIuXQ9najmbHs5As8NokQA5an6~BV8AT8EImoYKvVAALh7ebPtIaBww__" },
    { id: 3, name: "Yahia", image: "https://via.placeholder.com/50" },
    { id: 4, name: "Rana", image: "https://via.placeholder.com/50" },
  ];

  return (
    <div className="friends-suggestions">
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
