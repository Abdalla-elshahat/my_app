import { React, useEffect, useRef, useState } from "react";
import "./Profile.css";
import imgSrc from "./imageProfile/BEN-KIERMAN.jpg";
import { TfiMoreAlt } from "react-icons/tfi";
import {
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  UserCircle2,
} from "lucide-react";
import axios from "axios";
import { Domain, token } from "../../utels/consts";
import { FiCamera } from "react-icons/fi";
import Select from "react-select";
import { programmingSkills } from "../../utels/data.ts";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

function Profile() {
  const [showDetails, setShowDetails] = useState(true);

  const [details, setdetails] = useState({});

  const [skills, setskills] = useState([]);

  const [NewPhot, setNewPhot] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [popup, setPopup] = useState(false);

  const [popupInterst, setPopupInterst] = useState(false);

  const [popupSkills, setPopupSkills] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const [customAcademicInterest, setCustomAcademicInterest] = useState("");
  const [customExtracurricularInterest, setCustomExtracurricularInterest] =
    useState("");

  const [sharedPosts, setsharedPosts] = useState([]);

  const [clicked, setclicked] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  const [previewUrl, setPreviewUrl] = useState(
    details?.pictureUrl ? `${Domain}${details.pictureUrl}` : ""
  );

  const fileInputRef = useRef(null);
  const [learningId, setLearningId] = useState({
    school: "Tanta University",
    degree: "Bachelor of Science - BS",
    startDte: "2021-09-01T00:00:00.000Z",
    endDte: "2025-07-01T00:00:00.000Z",
    grade: 4,
    activities: "",
    description:
      "I'm currently a student at Faculty of Computers and Informatics, Tanta University. I'm interested in Computer Science and Problem Solving.",
  });

  // const userToken = Cookies.get("token"); // Get token from cookies (if required)

  const [profileData, setProfileData] = useState({
    displayName: details.displayName || "",
    address: details.address || "",
    job: details.job || "",
    skills: details.skills || [],
    learning: details.currentlyLearning || [],

    interests: details.interests || [],
  });

  useEffect(() => {
    if (details && Object.keys(details).length > 0) {
      setProfileData({
        displayName: details.displayName || "",
        address: details.address || "",
        job: details.job || "",
        skills: details.skills ? [...new Set(details.skills)] : [],
        learning:
          details.currentlyLearning?.filter((item) => item.trim() !== "") || [],
        interests: details.interests || [],
      });
    }
  }, [details]);

  function getProfile() {
    axios
      .get(`${Domain}/api/Profile/UserProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setdetails(res.data.data);
        if (res.data.data.pictureUrl) {
          setNewPhot(`${Domain}${res.data.data.pictureUrl}`); // Set image URL from backend
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }

  function getSharedPosts() {
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

  function updateProfile(e) {
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

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setNewPhot(previewUrl);

    updatePhoto(file); // ✅ Directly pass `file` to `updatePhoto()`
  }

  // Inside the useEffect for initial load
  useEffect(() => {
    const savedImageUrl = localStorage.getItem("profileImage");
    if (savedImageUrl) {
      setNewPhot(savedImageUrl); // Retrieve from localStorage
    }
    getProfile();
    getSharedPosts();
  }, []);

  function updatePhoto(file) {
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

  // const handleSkillsChange = (selectedOptions) => {
  //   const updatedSkills = selectedOptions.map(option => ({
  //     value: option.value||"",
  //     label: option.label||"",
  //     image: option.image||"",
  //   }));
  //   setskills(updatedSkills);

  // }

  const removeSkill = (skillToRemove) => {
    setskills(skills.filter((skill) => skill.value !== skillToRemove.value));
  };

  useEffect(function () {
    const savedImageUrl = localStorage.getItem("profileImage");
    if (savedImageUrl) {
      setNewPhot(savedImageUrl); // Retrieve from localStorage
    }
    getProfile();

    getSharedPosts();
  }, []);

  // ✅ Ensure `sharedPosts` updates when profile picture changes
  useEffect(() => {
    if (details.pictureUrl) {
      setNewPhot(`${Domain}${details.pictureUrl}`);

      setsharedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.user.id === details.id
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

  useEffect(
    function () {
      setNewPhot(NewPhot);
    },
    [NewPhot]
  );

  const academicSubjects = [
    "Mathematics",
    "Science",
    "English/Language Arts",
    "Social Studies",
    "Foreign Language",
  ];

  const extracurricularActivities = [
    "Sports",
    "Music/Band",
    "Drama/Theater",
    "Debate/Forensics",
    "Art",
    "Clubs/Organizations",
  ];

  // Load interests from local storage when component mounts
  useEffect(() => {
    const savedInterests = localStorage.getItem("selectedInterests");
    if (savedInterests) {
      setSelectedInterests(JSON.parse(savedInterests));
    }
  }, []);

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

      localStorage.setItem(
        "selectedInterests",
        JSON.stringify(filteredInterests)
      );

      return filteredInterests;
    });
  };

  const handleSubmit = () => {
    if (customAcademicInterest.trim()) {
      const updatedInterests = [
        ...selectedInterests,
        customAcademicInterest.trim(),
      ].filter(
        (item) => item !== "" // ✅ Ensure no empty values are saved
      );

      if (customExtracurricularInterest.trim()) {
        const updatedInterests = [
          ...selectedInterests,
          customExtracurricularInterest.trim(),
        ].filter(
          (item) => item !== "" // ✅ Ensure no empty values are saved
        );

        setSelectedInterests(updatedInterests);
        localStorage.setItem(
          "selectedInterests",
          JSON.stringify(updatedInterests)
        );
        setCustomAcademicInterest("");
        setCustomExtracurricularInterest("");
      }
      setPopupInterst(false);
    }
  };

  useEffect(() => {
    handleCheckboxChange();
  }, []);


  const [selectedSkills, setSelectedSkills] = useState([]);

  // Load skills from localStorage on mount
  useEffect(() => {
    const storedSkills = localStorage.getItem("selectedSkills");
    if (storedSkills) {
      setSelectedSkills(JSON.parse(storedSkills));
    }
  }, []);

  // Save skills to localStorage whenever they change
  useEffect(() => {
    if (selectedSkills.length > 0) {
      localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
    }
  }, [selectedSkills]);

  // Handle skill selection
  const handleSkillsChange = (selectedOptions) => {
    const updatedSkills = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
      image: option.image || "", // Ensure an image key exists
    }));
    setSelectedSkills(updatedSkills);
  };

  const handleSkillUpdate = (e) => {
    e.preventDefault();
    setPopupSkills(false); // Close modal after adding
  };

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
              updatePhoto(file); // Pass file directly instead of using state
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
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Follow
              </button>

              <div>
                <button
                  onClick={function () {
                    setclicked(true);
                  }}
                  className="dotts_btn"
                >
                  {" "}
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
                            onSubmit={updateProfile}
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
                  <span
                    key={skill.value}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <img
                      src={skill.image}
                      alt={skill.label}
                      className="w-5 h-5"
                    />
                    <span>{skill.label}</span>
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
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
                                  <img
                                    src={skill.image}
                                    alt={skill.label}
                                    className="w-5 h-5"
                                  />
                                  <span className="text-gray-800 text-sm">
                                    {skill.label}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSelectedSkills(
                                        selectedSkills.filter(
                                          (s) => s.value !== skill.value
                                        )
                                      )
                                    }
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
                            options={programmingSkills}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSkillsChange}
                            menuPlacement="auto"
                            menuPosition="fixed"
                            hideSelectedOptions={false}
                            value={selectedSkills} // Keep UI in sync with state
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Add Skills
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
              {
                <div className="mt-4">
                  <p>
                    <strong>School:</strong> {learningId?.school}
                  </p>
                  <p>
                    <strong>Degree:</strong> {learningId?.degree}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {learningId?.startDte}
                  </p>
                  <p>
                    <strong>End Date:</strong> {learningId?.endDte}
                  </p>
                  <p>
                    <strong>Grade:</strong> {learningId?.grade}
                  </p>
                  <p>
                    <strong>Activities:</strong> {learningId?.activities}
                  </p>
                  <p>
                    <strong>Description:</strong> {learningId?.description}
                  </p>
                </div>
              }

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
            {popupInterst && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="max-w-lg w-full bg-white p-4 rounded-lg shadow-lg relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setPopupInterst(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  >
                    ✖
                  </button>

                  <h2 className="text-lg font-semibold mb-2">
                    Area(s) of Interest:
                  </h2>

                  {/* Academic Subjects */}
                  <div className="mb-4">
                    <p className="font-medium">Academic Subjects:</p>
                    <div className="space-y-2 mt-2">
                      {academicSubjects.map((subject, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            checked={selectedInterests.includes(subject)}
                            onChange={() => handleCheckboxChange(subject)}
                          />

                          <span>{subject}</span>
                        </label>
                      ))}

                      {/* Other Option with Text Input */}
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                          checked={customAcademicInterest.length > 0}
                          onChange={() =>
                            setCustomAcademicInterest(
                              customAcademicInterest ? "" : " "
                            )
                          }
                        />
                        <span>Other</span>
                      </label>

                      {customAcademicInterest.length > 0 && (
                        <input
                          type="text"
                          value={customAcademicInterest}
                          onChange={(e) =>
                            setCustomAcademicInterest(e.target.value)
                          }
                          placeholder="Please type another option here"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* Extracurricular Activities */}
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-medium">Extracurricular Activities:</p>
                    <div className="space-y-2 mt-2">
                      {extracurricularActivities.map((activity, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            checked={selectedInterests.includes(activity)}
                            onChange={() => handleCheckboxChange(activity)}
                          />
                          <span>{activity}</span>
                        </label>
                      ))}

                      {/* Other Option with Text Input */}
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                          checked={customExtracurricularInterest.length > 0}
                          onChange={() =>
                            setCustomExtracurricularInterest(
                              customExtracurricularInterest ? "" : " "
                            )
                          }
                        />
                        <span>Other</span>
                      </label>

                      {customExtracurricularInterest.length > 0 && (
                        <input
                          type="text"
                          value={customExtracurricularInterest}
                          onChange={(e) =>
                            setCustomExtracurricularInterest(e.target.value)
                          }
                          placeholder="Please type another option here"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={() => {
                      if (customAcademicInterest.trim()) {
                        handleCheckboxChange(customAcademicInterest.trim());
                        setCustomAcademicInterest("");
                      }
                      if (customExtracurricularInterest.trim()) {
                        handleCheckboxChange(
                          customExtracurricularInterest.trim()
                        );
                        setCustomExtracurricularInterest("");
                      }
                      setPopupInterst(false);
                    }}
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="mt-8 space-y-4">
          {sharedPosts?.map((sharedPost) => {
            return (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-3 ">
                  {/* <UserCircle2 className="w-8 h-8" /> */}
                  <div className="bg-red-500 rounded-full">
                    <img
                      src={
                        sharedPost.user.id === details.id
                          ? NewPhot
                          : `${Domain}${sharedPost.user.pictureUrl}`
                      }
                      alt={sharedPost.id}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* <img src ={`${Domain}${sharedPost.user.pictureUrl}`}  alt={sharedPost.id} className=" w-10  h-10 rounded-full object-cover"/> */}
                  </div>

                  <div>
                    <div className="font-medium">
                      {sharedPost.user.displayName}
                    </div>

                    <div className="text-gray-500 text-sm">
                      {new Date(sharedPost.postDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long", // Full day name (e.g., Monday)
                          day: "numeric", // Day number (e.g., 13)
                        }
                      )}
                    </div>
                  </div>
                </div>
                {showDetails && (
                  <h3 className="font-medium mb-3 ">{sharedPost.title}</h3>
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
                    <MessageCircle size={16} /> {sharedPost.commentCount}{" "}
                    comments
                  </span>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <span>{sharedPost.sharesCount}</span> <Share2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
