import React, { createContext, useState, useEffect } from "react";

// Create Context
export const SavedPostsContext = createContext();

export const SavedPostsProvider = ({ children }) => {

    const [unsve, setunsve] = useState(true)

  const [savedPosts, setSavedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("savedPosts")) || {};
  });

//   useEffect(() => {
//     axios.get(`${Domain}/api/SavedPost/list`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       const savedPostIds = res.data.data;
//       const savedState = savedPostIds.reduce((acc, postId) => {
//         acc[postId] = true;
//         return acc;
//       }, {});
//       setSavedPosts(savedState);
//       localStorage.setItem("savedPosts", JSON.stringify(savedState));
//     })
//     .catch((err) => {
//       console.error("❌ Error fetching saved posts:", err);
//     });
//   }, []);

//   const toggleSave = (postId) => {
//     axios
//       .post(`${Domain}/api/SavedPost/toggle-save/${postId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setSavedPosts((prev) => {

            
//           const updatedPosts = { ...prev };
//           if (updatedPosts[postId]) {
//             delete updatedPosts[postId]; // Remove if already saved
//           } else {
//             updatedPosts[postId] = true; // Add if not saved
//           }
//           localStorage.setItem("savedPosts", JSON.stringify(updatedPosts));
//           return updatedPosts;
//         });
//       })
//       .catch((err) => {
//         console.error("❌ Error toggling save:", err);
//       });
//   };

  return (
    <SavedPostsContext.Provider value={{ savedPosts , setSavedPosts , unsve , setunsve }}>
      {children}
    </SavedPostsContext.Provider>
  );
};
