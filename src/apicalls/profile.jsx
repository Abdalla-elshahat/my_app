import axios from "axios";
import { Domain, token } from "../utels/consts";

export function getProfile(setdetails, setNewPhot,setLearning) {
  axios.get(`${Domain}/api/Profile/UserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setdetails(res.data.data);
      setLearning(res.data.data.education)
      if (res.data.data.pictureUrl) {
        setNewPhot(`${Domain}${res.data.data.pictureUrl}`); // Set image URL from backend
      }
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });
}
export function getSharedPosts(setsharedPosts) {
    axios
      .get(`${Domain}/api/Share/user-posts-with-shares`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming `token` is defined
        },
      })
      .then((res) => {
        setsharedPosts(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
}
 export function updateProfile(e,profileData,setPopup) {
    e.preventDefault();
    const updatedData = {
      ...profileData,
      skills: Array.isArray(profileData.skills) ? profileData.skills : [],
      learning: Array.isArray(profileData.learning) ? profileData.learning : [],
      interests: Array.isArray(profileData.interests)
        ? profileData.interests
        : [],
    };

    axios
      .put(`${Domain}/api/Profile/update-profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Profile Updated:", res.data);
        getProfile(); // Refresh profile
        setPopup(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
}
export function updatePhoto(file,setNewPhot,setsharedPosts,details) {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("Picture", file); // ✅ API expects "Picture"

    axios
      .put(`${Domain}/api/User/Updatepicture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set "Content-Type" manually, Axios will set it automatically
        },
      })
      .then((res) => {
        console.log("✅ Upload Success:", res.data);
        setNewPhot();
        getProfile(); // Refresh profile

        // ✅ Fetch shared posts again to get updated images
        getSharedPosts();

        // ✅ Update sharedPosts state with new image
        setsharedPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.user.id === details.id // Ensure we're updating the correct user
              ? {
                  ...post,
                  user: {
                    ...post.user,
                    pictureUrl: `${Domain}${res.data.pictureUrl}`,
                  },
                }
              : post
          )
        );
      })
      .catch((error) => {
        console.error("❌ Upload Failed:", error.response?.data || error);
      });
}
export  function GetLearningByUserId(id,setLearningData,setFormData,setErrorMessage) {
    axios.get(`${Domain}/api/Learning/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("✅ Learning Data Fetched:", res.data);
        setLearningData(res.data); // Store retrieved data in state
        setFormData(res.data); // Populate form with fetched data
      })
      .catch((err) => {
        console.error("❌ Error fetching learning data:", err);
        setErrorMessage("Failed to fetch learning data.");
      });
}
// export function sendLearning(school,degree,startDte,endDte,grade,activities,description,about,setErrorMessage) {
//     const formattedData = {
//       school,
//       degree,
//       startDte,
//       endDte,
//       grade,
//       activities,
//       description,
//       about,
//     };

//     axios.put(`${Domain}/api/Learning/Learning`, formattedData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("✅ Success:", res.data);
//       })
//       .catch((err) => {
//         console.error("❌ Error:", err);
//         setErrorMessage(err.response?.data?.message || err.message);
//       });
// }