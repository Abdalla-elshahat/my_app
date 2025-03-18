import { React, useState } from "react";
import Icons from "../Icons/Icons";
import { Domain, token } from './../../utels/consts';
import { CiCircleMinus } from "react-icons/ci";
import axios from "axios";
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { SavedPostsContext } from '../../Contexts/SavedPostsContext';
const SavedItemCard = ({
  displayName,
  createAt,
  describtion,
  likesCount,
  commentCount,
  userImage,
  postId,
  images,
  getSaved
}) => {
  const { savedPosts , setSavedPosts , setunsve } = useContext(SavedPostsContext);
  const [showDetails, setShowDetails] = useState(true);
  const [failSaved, setfailSaved] = useState("")
  function unsavedDone(unsaveMessage){
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${unsaveMessage}`,
      showConfirmButton: false,
      timer: 1700,
      background: "#F8F9FA", // Light yellow background
    });
  }

    // Convert createAt to Month Name and Day
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    };

    const toggleSave = (postId) => {
      axios
        .post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(`🔄 Toggled save for post ID: ${postId}`, res.data);

          console.log(res.data  )
          setfailSaved(res.data.message)
  
          unsavedDone(res.data.message)
  
          getSaved(); // Refresh saved items

          setunsve(false)
    
          setSavedPosts((prev) => {
            const updatedPosts = { ...prev };
            if (updatedPosts[postId]) {
              delete updatedPosts[postId]; // Remove if already saved
            } else {
              updatedPosts[postId] = true; // Add if not saved
            }
            return updatedPosts;
          });
    
          getSaved(); // Refresh saved items
          setunsve(false);
        })
        .catch((err) => {
          console.error("❌ Error toggling save:", err);
        });
    };
    

  
  return (
  
  <div className="saved-item-card">
  
      <div className="saved-card-header bg-re-500 relative">
        <img src= {`${Domain}${userImage}`} alt="profile" className="profile-image" />

        <div>
          <h4>{displayName}</h4>
          <p className="date">{formatDate(createAt)}</p>
        </div>


        <button className = "unSavepost absolute right-0" onClick={() => toggleSave(postId)} >
        <CiCircleMinus className="text-[24px] text-[#4d4a4a]" />

        </button>
  
      </div>
  
      <div className="saved-card-content">
  
        {showDetails && <p>{describtion}</p>}

{images?.map((photo, index) => (
  <img 
    key={index} 
    src={`${Domain}${photo}`} 
    alt="Saved post" 
    className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-md"
  />
))}



        <button
          className="text-blue-600"
          onClick={() => setShowDetails((h) => !h)}
        >
          {showDetails ? "Hide" : "Show"} details
        </button>
  
      </div>
  
      <div className="saved-card-footer">
        <span>
          {likesCount} reactions • {commentCount} comments
        </span>
  
        <div className="card-icons">
          <Icons />
        </div>


      </div>
    </div>
  );
};

export default SavedItemCard;
