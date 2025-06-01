import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Domain, token } from "./../utels/consts";

// Create Context
export const LearningDataContext = createContext();

export const LearningDataProvider = ({ children }) => {
  const [learningggg, setlearning] = useState(null);
  const [id, setId] = useState(null); // Store user ID

async function sendLearning(school, degree, startDte, endDte, grade, activities, description, about, setErrorMessage) {
  const formattedData = {
    school: school || "",
    degree: degree || "",
    startDte: startDte || "",
    endDte: endDte || "",
    grade: grade || "",
    activities: activities || "",
    description: description || "",
    about: about || "",
  };

  try {
    const url = `${Domain}/api/Learning/Learning`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    let res;
    if (!learningggg) {
      // مفيش بيانات => POST
      res = await axios.post(url, formattedData, { headers });
    } else {
      // فيه بيانات => PUT (تحديث)
      res = await axios.put(url, formattedData, { headers });
    }

    console.log(res.data);
    setlearning(res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Error:", err);
    setErrorMessage(err.response?.data?.message || "An error occurred.");
    throw err;
  }
}

  

  // GetCurrentUser endpoint to fetch the user ID
  function getId() {
    axios
      .get(`${Domain}/api/Account/GetCurrentUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setId(res.data.userId);
        // console.log("✅ User ID fetched:", res.data.userId);
      })
      .catch((err) => {
        console.error("❌ Error fetching profile:", err);
      });
  }

  function GetLearningByUserId(userId) {
    if (!userId) {
      // console.warn("⚠️ User ID is missing, cannot fetch learning data.");
      return;
    }

    axios
      .get(`${Domain}/api/Learning/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.data) {
          setlearning(res.data.data[0] || null); // Store the first item or null
          // console.log("📌 Learning Data fetched:", res.data.data[0]);
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching learning data:", err);
      });
  }

  // Run `getId()` when the provider mounts
  useEffect(() => {
    getId();
  }, []);

  // Fetch learning data once `id` is available
  useEffect(() => {
    if (id) {
      GetLearningByUserId(id);
    }
  }, [id]);

  return (
    <LearningDataContext.Provider value={{ learningggg, sendLearning, GetLearningByUserId, id, getId }}>
      {children}
    </LearningDataContext.Provider>
  );
};
