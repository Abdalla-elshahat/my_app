import React from "react";
import Icons from "../Icons/Icons";
const SavedItemCard = ({
  name,
  date,
  content,
  reactions,
  comments,
  profileImage,
}) => {
  return (
    <div className="saved-item-card">
      <div className="saved-card-header">
        <img src={profileImage} alt="profile" className="profile-image" />
        <div>
          <h4>{name}</h4>
          <p className="date">{date}</p>
        </div>
      </div>
      <div className="saved-card-content">
        <p>{content}</p>
      </div>
      <div className="saved-card-footer">
        <span>
          {reactions} reactions • {comments} comments
        </span>
        <div className="card-icons">
          <Icons />
          {/* <i className="icon">🔄</i>
          <i className="icon">💬</i>
          <i className="icon">❤️</i> */}
        </div>
      </div>
    </div>
  );
};

export default SavedItemCard;
