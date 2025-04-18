import { React, useContext, useEffect, useRef, useState } from "react";
import "./Profile.css";
import imgSrc from "./imageProfile/BEN-KIERMAN.jpg";
import { TfiMoreAlt } from "react-icons/tfi";
import {Heart, MapPin, MessageCircle, Share2,} from "lucide-react";
import { Domain, token } from "../../utels/consts";
import { FiCamera } from "react-icons/fi";
import Select from "react-select";
import { programmingSkills } from "../../utels/data.ts";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getInterests, getProfile, getSharedPosts, getSkillsById, updatePhoto, updateProfile } from "../../apicalls/profile.jsx";
import PopupModal from "./popupintersts.jsx";
import { LearningDataContext } from "../../Contexts/LearningData";
import axios from "axios";
import { getGridClass, getImageClass } from "../../apicalls/logics.jsx";

function Profile() {
  const [showDetails, setShowDetails] = useState(true);

  const [details, setdetails] = useState({});
  const [NewPhot, setNewPhot] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupInterst, setPopupInterst] = useState(false);
  const [popupSkills, setPopupSkills] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customAcademicInterest, setCustomAcademicInterest] = useState("");
  const [customExtracurricularInterest, setCustomExtracurricularInterest] =useState("");
  const [sharedPosts, setsharedPosts] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [learning, setLearning] = useState({});

  const [selectedSkills, setSelectedSkills] = useState([] );
  
  const [profileData, setProfileData] = useState({
    displayName: details.displayName || "",
    address: details.address || "",
    job: details.job || "",
  });
  
  const [skillId, setskillId] = useState(null)

  const { learningggg, GetLearningByUserId, id , getId } = useContext(LearningDataContext);


  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]:
        name === "skills" || name === "learning" || name === "interests"
          ? value.split(",").map((item) => item.trim()) // Convert CSV to array
          : value,
    }));
  };




  const formatFacebookDate = (dateString) => {
    // Handle invalid dates
    if (!dateString || dateString.startsWith("0001-01-01")) {
      return "No date available";
    }
  
    const postDate = new Date(dateString);
    if (isNaN(postDate.getTime())) return "Invalid date"; // Extra safety check
  
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  
    if (diffInDays === 1) {
      return `Yesterday at ${postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    }
  
    // If the post is from the same year, show "Mar 20 at 5:47 PM"
    if (postDate.getFullYear() === now.getFullYear()) {
      return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
             ` at ${postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    }
  
    // If the post is from a different year, show "Mar 20, 2024 at 5:47 PM"
    return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
           ` at ${postDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  };
  
  
  

  useEffect(() => {
    console.log(id)
    getId()
    GetLearningByUserId(id)
      }, [id]);
  
  

  useEffect(() => {
    if (details && Object.keys(details).length > 0) {
      setProfileData({
        displayName: details.displayName || "",
        address: details.address || "",
        job: details.job || "",
      });
    }
    // console.log(details)
  }, [details]);

  useEffect(() => {
    getProfile(setdetails,setNewPhot,setLearning);
    getSharedPosts(setsharedPosts);
  }, []);

  useEffect(() => {
    if (details.pictureUrl) {
      setNewPhot(`${Domain}${details?.pictureUrl}`);
      setsharedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post?.user?.id === details.id
            ? {
                ...post,
                user: {
                  ...post.user,
                  pictureUrl: `${Domain}${details.pictureUrl}`,
                },
              }
            : post
        )
      );
    }
  }, [details.pictureUrl]);

  useEffect(()=>{
    setNewPhot(NewPhot);
  },[NewPhot]);





  const handleCheckboxChange = (interest) => {
    setSelectedInterests((prev = []) => {
      // ✅ Default to an empty array
      const updatedInterests = prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest];

      // ✅ Save only non-empty values to localStorage
      const filteredInterests = updatedInterests.filter(
        (item) => item?.trim() !== ""
      );

      // console.log(filteredInterests)


      return filteredInterests;
    });
  };


  useEffect(() => {
    handleCheckboxChange();
  }, []);



  



// skillllll


// Handle skill selection
const handleSkillsChange = (selectedOptions) => {
  setSelectedSkills((prevSkills) => {
    const updatedSkills = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    console.log("Selected Skills (Before State Update):", prevSkills);
    console.log("Updated Skills (New Selection):", updatedSkills);

    return updatedSkills;
  });
};


const handleSkillUpdate = (e) => {
  e.preventDefault();
  setPopupSkills(false);
};



useEffect(() => {
  if (id) {
    getSkillsById(id,setskillId,setSelectedSkills);
  }
}, [id]);




function sendSkills() {
  let uniqueSkills = [...new Set(selectedSkills.map((skill) => skill.label))];

  // Even if no skills are selected, we should send an empty array
  const payload = {
    id: skillId,
    skillName: uniqueSkills.length > 0 ? uniqueSkills : [], // Send empty array if no skills
  };

  console.log("Sending Payload:", JSON.stringify(payload, null, 2));

  axios
    .put("http://arabdevcommunity.runasp.net/api/Skill/update-skill", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("Success:", res);
      getSkillsById(); // Refresh after update
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  setPopupSkills(false); // Close modal after saving
}


  useEffect(() => {
    getInterests(setSelectedInterests);
  }, []);
  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Profile Header */}
      <div className="relative ">
        <div className="h-48 bg-blue-600 w-full"></div>

        <div className="container absolute w-20 h-20  left-12 max-md:left-1/2 max-md:right-1/2  -bottom-15 rounded-full  overflow-hidden border-white bg-gray-200 -translate-y-1/2 -translate-x-1/2">
          <button
            onClick={() => setIsOpen(true)}
            className="block text-white bg-blue-700 w-full hover:bg-blue-800"
            type="button"
          >
            <img
              src={
                NewPhot ||
                (details?.pictureUrl ? `${Domain}${details.pictureUrl}` : "")
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        <span
          className="absolute bg-[#d6d7d8] rounded-full cursor-pointer  p-[3px] left-[55%] md:left-[68px] top"
          onClick={() => fileInputRef.current.click()}
        >
          <FiCamera />
        </span>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setNewPhot(previewUrl);
              updatePhoto(file,setNewPhot,setsharedPosts,details); // Pass file directly instead of using state
            }
          }}
          className="hidden"
        />
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between max-[820px]:items-center max-[820px]:text-center  py-2">
          <div>
            <h1 className="text-2xl font-bold">{details.displayName}</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1 max-[820px]:justify-center">
              <MapPin size={16} /> Egypt, {details.address}
            </p>
            {/* <p className="text-gray-600">{details.job}END DEVELOPER</p> */}
            <p className="text-gray-600">{details.job}</p>
          </div>

          <div
            className="flex flex-col items-center gap-5 mt-4 md:mt-0 max-[820px]:justify-center  "
            tabIndex={0} // Allows blur event detection
            onBlur={function () {
              setclicked(false);
            }}
          >
            <div className="flex items-center space-x-3">
              <div>
                <button className="dotts_btn" onClick={()=> { setclicked(true)}} >
                  <TfiMoreAlt />{" "}
                </button>

                <div>
                  <ul>
                    {/* Modal Toggle Button */}

                    {
                      <button
                        onClick={() => setPopup((prev) => !prev)} // Toggle state
                        className={` ${
                          clicked ? "block" : "hidden"
                        } rounded-lg px-2 py-1 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium text-sm text-center dark:bg-blue-600`}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking inside
                        type="button"
                      >
                        EditInfo
                      </button>
                    }

                    {popup && (
                      <div
                        className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
                        onClick={() => setPopup(false)} // Clicking outside closes modal
                      >
                        <div
                          className="relative p-4 w-full max-w-sm bg-white rounded-lg shadow-sm"
                          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                          {/* Modal Header */}
                          <div className="flex justify-between items-center border-b  p- bg--500">
                            <h3 className="text-lg font-semibold text-black">
                              Update Your Profile
                            </h3>
                            <button
                              onClick={() => setPopup(false)}
                              className="text-black hover:text-gray-200"
                            >
                              ✖
                            </button>
                          </div>

                          {/* Form */}
                          <form
                            onSubmit={(e)=>updateProfile(e,profileData,setPopup)}
                            className="p-4 overflow-auto"
                          >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                              {/* Name Input */}
                              <div className="col-span-2">
                                <label
                                  htmlFor="name"
                                  className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="displayName"
                                  value={profileData.displayName}
                                  onChange={handleChange}
                                  className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                  placeholder="Type Name"
                                  required
                                />
                              </div>

                              {/* Address Input */}
                              <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  value={profileData.address}
                                  onChange={handleChange}
                                  className="w-full p-2 border rounded-lg"
                                />
                              </div>

                              {/* Job Input */}
                              <div className="col-span-1">
                                <label className="block mb-2 text-sm font-medium">
                                  Job
                                </label>
                                <input
                                  type="text"
                                  name="job"
                                  value={profileData.job}
                                  onChange={handleChange}
                                  className="w-full p-2 border rounded-lg"
                                />
                              </div>
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              onClick={() => setIsVisible(false)}
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Save Changes
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-8 mt-4 md:mt-0 max-[820px]:justify-center">
              <div className="text-center">
                <div className="font-bold">{details.postsCount}</div>
                <div className="text-gray-600">posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{details.followersCount}</div>
                <div className="text-gray-600">followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{details.followingCount}</div>
                <div className="text-gray-600">following</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500">
          {/* Main modal */}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)} // Close when clicking outside
            >
              <div
                className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                {/* Modal header */}
                <div className="flex items-center justify-between p- border-b rounded-t dark:border-gray-600 border-gray-200">
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal body */}
                <div className=" w-ful h-96 p-4 md:p-5 space-y-4">
                  <img
                    src={
                      NewPhot ||
                      (details?.pictureUrl
                        ? `${Domain}${details.pictureUrl}`
                        : imgSrc)
                    }
                    alt="Profile"
                    className="w-full h-full object-"
                  />
                </div>
              </div>
            </div>
          )}
        </div>



        
<div className="grid md:grid-cols-3 gap-6 mt-8">


{/* Skills */}
<div className="bg-white p-4 rounded-lg shadow-sm">
<h2 className="font-semibold mb-2">Skills</h2>

<div className="flex flex-wrap gap-2 relative">
{/* Display Selected Skills */}
{selectedSkills.length > 0 ? (
selectedSkills.map((skill) => (
<div key={skill.value} className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full shadow-sm">
<span className="text-gray-800 text-sm">{skill.label}</span>
</div>
))
) : (
<p className="text-gray-500">No skills selected.</p>
)}



{/* Edit Button */}
<button
onClick={() => setPopupSkills(true)}
type="button"
className="ml-2"
>
<FaPen className="text-gray-500 hover:text-black absolute right-0 top-[-26px]" />
</button>

{/* Modal */}
{popupSkills && (
<div
className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
onClick={() => setPopupSkills(false)}
>
<div
className="relative p-4 w-full max-w-sm bg-white rounded-lg shadow-sm"
onClick={(e) => e.stopPropagation()}
>
<div className="flex justify-between items-center border-b p-4">
  <h3 className="text-lg font-semibold text-black">
    Update Your Skills
  </h3>
  <button
    onClick={() => setPopupSkills(false)}
    className="text-black hover:text-gray-500"
  >
    ✖
  </button>
</div>

<form
  className="p-4 overflow-auto"
  onSubmit={handleSkillUpdate}
>
  <div className="grid gap-4 mb-4">
    {/* Selected Skills */}
    <div>
      <label className="block mb-2 text-sm font-medium">
        Selected Skills
      </label>
      <div className="flex flex-wrap gap-2 max-h-28 overflow-auto border p-2 rounded-lg">
        {selectedSkills.length > 0 ? (
          selectedSkills.map((skill) => (
            <div
              key={skill.value}
              className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full shadow-sm"
            >
              <span className="text-gray-800 text-sm ">
                {skill.label}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedSkills((prevSkills) =>
                    prevSkills.filter((s) => s.label !== skill.label)
                  );
                  console.log("Removed Skill:", skill.label);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No skills selected.
          </p>
        )}
      </div>
    </div>

    {/* Skills Selection */}
    <div>
      <label htmlFor="skills">Select Skills</label>

<Select
isMulti
id="skills"
name="skills"
options={programmingSkills.map((option) => ({
...option,
isDisabled: selectedSkills.some((skill) => skill.value === option.value), // Disable previously selected skills
}))}
className="basic-multi-select"
classNamePrefix="select"
onChange={(selectedOptions) => {
// Prevent adding already selected skills
const newOptions = selectedOptions.filter(
(option) => !selectedSkills.some((skill) => skill.value === option.value)
);

setSelectedSkills([...selectedSkills, ...newOptions]); // Append only new options
}}
menuPlacement="auto"
menuPosition="fixed"
hideSelectedOptions={false}
components={{ MultiValue: () => null }} // Prevent duplicate display in the dropdown
value={selectedSkills}
/>


    
    </div>
  </div>

  {/* Submit Button */}
  <button
    onClick={sendSkills}
    type="submit"
    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
  >
    Save Changes
  </button>
</form>
</div>
</div>
)}
</div>
</div>


{/* Learning */}
<div className="bg-white p-4 rounded-lg shadow-sm">
<h2 className="font-semibold mb-2">Currently Learning</h2>
<div className="flex flex-wrap gap-2 relative">
{learningggg ? (
<div className="mt-4">
  <p><strong>School:</strong> {learningggg.school}</p>
  <p><strong>Degree:</strong> {learningggg.degree}</p>
  <p><strong>Start Date:</strong> {learningggg.startDte}</p>
  <p><strong>End Date:</strong> {learningggg.endDte}</p>
  <p><strong>Grade:</strong> {learningggg.grade}</p>
  <p><strong>Activities:</strong> {learningggg.activities}</p>
  <p><strong>Description:</strong> {learningggg.description}</p>
  <p><strong>About:</strong> {learningggg.about}</p>

</div>
) : (
<p className="text-gray-500">No learning data available.</p>
)}

<Link to="/learningForm">
<button type="button" className="ml-2">
  <FaPen className="text-gray-500 hover:text-black absolute right-0 top-[-26px]" />
</button>
</Link>
</div>
</div>



{/* Interests */}
<div className="bg-white p-4 rounded-lg shadow-sm">

  <h2 className="font-semibold mb-2">My Interests</h2>

  <div className="flex flex-wrap gap-2 relative">

    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setPopupInterst(true)}
      type="button"
      className="ml-2"
    >

      <FaPen className="text-gray-500 hover:text-black absolute right-0 top-[-26px]" />

    </button>

    {/* Display selected interests */}
    {Array.isArray(selectedInterests) &&
    selectedInterests.length > 0 ? (
      selectedInterests
        .filter(
          (interest) =>
            typeof interest === "string" && interest.trim() !== ""
        )
        .map((interest, index) => (
          <span
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            {interest}
          </span>
        ))
    ) : (
      <p className="text-gray-400 text-sm">No interests selected</p> // ✅ Show message when empty
    )}
  </div>

  {/* Popup Modal */}
  <PopupModal
  isOpen={popupInterst}
  onClose={() => setPopupInterst(false)}
  selectedInterests={selectedInterests}
  setSelectedInterests={setSelectedInterests} // <-- Pass this for updates
  customAcademicInterest={customAcademicInterest}
  setCustomAcademicInterest={setCustomAcademicInterest}
  customExtracurricularInterest={customExtracurricularInterest}
  setCustomExtracurricularInterest={setCustomExtracurricularInterest}
/>

</div>

</div>

        {/* Posts */}
        
                <div className="mt-8 space-y-6">
        
                  {


                    sharedPosts?.map( (sharedPost) => {
                      
        
                      return(

                        <>

                        {
                          sharedPost.type === "Post" ?
                        
                        <div  className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center gap-3 mb-3 ">

                          <div className="bg-red-500 rounded-full">

                          <img 
          src={sharedPost.shareId === details?.id ? NewPhot : `${Domain}${sharedPost.user.pictureUrl}`}  
          alt={sharedPost.shareId} 
          className="w-10 h-10 rounded-full object-cover"
        />
                          </div>
        
                          <div>
                            <div className="font-medium">{sharedPost.user.displayName}</div>
        
                            <div className="text-gray-500 text-sm">
                             {new Date(sharedPost.postDate).toLocaleDateString("en-US", {
                             weekday: "long", // Full day name (e.g., Monday)
                             day: "numeric", // Day number (e.g., 13)
                            })}
                           </div>
        
                          </div>
        
                        </div>
                        {showDetails && (
                          <h3 className="font-medium mb-3 ">{sharedPost.title}</h3>
                        )}
        
        {sharedPost.images && sharedPost.images.length > 0 && (
  <div className={`grid gap-1 ${getGridClass(sharedPost.images.length)}`}>
    {sharedPost.images.map((photo, index) => (
      <img
        key={index}
        src={`${Domain}${photo}`}
        alt="Post"
        className={`w-full h-full object-cover rounded-lg ${getImageClass(sharedPost.images.length, index)}`}
      />
    ))}
  </div>
)}


        
                        
        
                        <button
                          className="text-blue-600"
                          onClick={() => setShowDetails((h) => !h)}
                        >
                          {showDetails ? "Hide" : "Show"} details
                        </button>

                        <div className="flex items-center gap-6 text-gray-500 text-sm">
                          <span className="flex items-center gap-1">
                            <Heart size={16} /> {sharedPost.likesCount} reactions
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} /> {sharedPost.commentCount} comments
                          </span>
                          <button className="flex items-center gap-1 hover:text-gray-700">
                            <span>{sharedPost.sharesCount}</span> <Share2 size={16} />
                          </button>
                        </div>
                      </div>

                      : sharedPost.type === "Share" ?

                      <div  className=" p-4 rounded-lg shadow-sm border">

<div className = "mb-3 border-b border-b-[#cfd0d1] py-2" >

<div className="flex items-center gap-3 mb-3  ">

<div className="bg-red-500 rounded-full">
<img 
src={`${Domain}${sharedPost?.user?.pictureUrl}`}  
alt={sharedPost.postId} 
className="w-10 h-10 rounded-full object-cover"
/>
</div>

<div>
  <div className="font-medium">{sharedPost?.user?.displayName}</div>

  {/* <div className="text-gray-500 text-sm">
   {new Date(sharedPost.postDate).toLocaleDateString("en-US", {
   weekday: "short", // Full day name (e.g., Monday)
   year: "numeric", // Day number (e.g., 13)
  })}
 </div> */}

<div className="text-gray-500 text-sm">
  {formatFacebookDate(sharedPost.postDate)}
</div>




</div>

</div>
<h3 className="font-medium mb-3 ">{sharedPost.title}</h3>

</div>


                      <div className="flex items-center gap-3 mb-3 ">

                        <div className="bg-red-500 rounded-full">
                        <img 
        src={ `${Domain}${sharedPost.sharedFrom.user.pictureUrl}`}  
        alt={sharedPost.sharedFrom.id} 
        className="w-10 h-10 rounded-full object-cover"
      />
                        </div>
      
                        <div>
                          <div className="font-medium">{sharedPost.sharedFrom.user.displayName}</div>
                        </div>
      
                      </div>
      
                      {showDetails && (
                        <h3 className="font-medium mb-3 ">{sharedPost.sharedFrom.title}</h3>
                      )}
      
                      {sharedPost.images?.map((photo, index) => (
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

                      <div className="flex items-center gap-6 text-gray-500 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart size={16} /> {sharedPost.likesCount} reactions
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} /> {sharedPost.commentCount} comments
                        </span>
                        <button className="flex items-center gap-1 hover:text-gray-700">
                          <span>{sharedPost.sharesCount}</span> <Share2 size={16} />
                        </button>
                      </div>
                    </div>

                    : ""

                    }

      

                    </>
                      )
        
                    } )
                  }
         
                </div>

      </div>
    </div>
  );
}
export default Profile;
