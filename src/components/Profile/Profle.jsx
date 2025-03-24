import { React, useEffect, useRef, useState } from "react";
import "./Profile.css";
import imgSrc from "./imageProfile/BEN-KIERMAN.jpg";
import { TfiMoreAlt } from "react-icons/tfi";
import {MapPin,} from "lucide-react";
import { Domain } from "../../utels/consts";
import { FiCamera } from "react-icons/fi";
import Select from "react-select";
import { programmingSkills } from "../../utels/data.ts";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProfile, getSharedPosts, updatePhoto, updateProfile } from "../../apicalls/profile.jsx";
import PopupModal from "./popupintersts.jsx";
function Profile() {
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
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileData, setProfileData] = useState({
    displayName: details.displayName || "",
    address: details.address || "",
    job: details.job || "",
  });
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
  useEffect(() => {
    if (details && Object.keys(details).length > 0) {
      setProfileData({
        displayName: details.displayName || "",
        address: details.address || "",
        job: details.job || "",
      });
    }
    console.log(details)
  }, [details]);

  useEffect(() => {
    getProfile(setdetails,setNewPhot,setLearning);
    getSharedPosts(setsharedPosts);
  }, []);

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

  useEffect(()=>{
    setNewPhot(NewPhot);
  },[NewPhot]);

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


      return filteredInterests;
    });
  };


  useEffect(() => {
    handleCheckboxChange();
  }, []);

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
                    <strong>School:</strong> {learning?.school}
                  </p>
                  <p>
                    <strong>Degree:</strong> {learning?.degree}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {learning?.startDte}
                  </p>
                  <p>
                    <strong>End Date:</strong> {learning?.endDte}
                  </p>
                  <p>
                    <strong>Grade:</strong> {learning?.grade}
                  </p>
                  <p>
                    <strong>Activities:</strong> {learning?.activities}
                  </p>
                  <p>
                    <strong>Description:</strong> {learning?.description}
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
            <PopupModal
        isOpen={popupInterst}
        onClose={() => setPopupInterst(false)}
        academicSubjects={academicSubjects}
        extracurricularActivities={extracurricularActivities}
        selectedInterests={selectedInterests}
        handleCheckboxChange={handleCheckboxChange}
        customAcademicInterest={customAcademicInterest}
        setCustomAcademicInterest={setCustomAcademicInterest}
        customExtracurricularInterest={customExtracurricularInterest}
        setCustomExtracurricularInterest={setCustomExtracurricularInterest}
      />
          </div>
        </div>
        {/* Posts */}
        {/**/}
      </div>
    </div>
  );
}

export default Profile;