import React, { createContext, useState} from "react";

// Create Context
export const SavedPostsContext = createContext();
export const SavedPostsProvider = ({ children }) => {
  const [unsve, setunsve] = useState(true);
  const [savedPosts, setSavedPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("savedPosts")) || {};
  });

  return (
    <SavedPostsContext.Provider
      value={{ savedPosts, setSavedPosts, unsve, setunsve }}
    >
      {children}
    </SavedPostsContext.Provider>
  );
};
