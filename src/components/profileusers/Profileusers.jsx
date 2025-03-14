import { React, useEffect, useState } from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import { MapPin } from "lucide-react";
import { followUserFromProfile, getfolloweing, getfollowers, getprofileuser } from "../../apicalls/follows";
import { useParams } from "react-router-dom";
import { Domain } from "../../utels/consts";
import Popup from "./Popup";

function Profileusers() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [followData, setFollowData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false); // حالة لفتح أو إغلاق البوب أب
  const [popupTitle, setPopupTitle] = useState("");

  useEffect(() => {
    if (id) {
      getprofileuser(id, setUser);
    }
  }, [id]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-blue-600 w-full"></div>
        <div className="container absolute w-20 h-20 left-12 max-md:left-1/2 max-md:right-1/2 -bottom-15 rounded-full overflow-hidden border-white bg-gray-200 -translate-y-1/2 -translate-x-1/2">
          <img
            src={`${Domain}/${user.pictureUrl}` || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between text-center py-2">
          <div>
            <h1 className="text-2xl font-bold">{user.displayName || "Unknown"}</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1 justify-center">
              <MapPin size={16} /> {user.address || "No address provided"}
            </p>
            <p className="text-gray-600">{user.job || "No job specified"}</p>
          </div>
          <div className="flex flex-col items-center gap-5 mt-4 md:mt-0">
            <div className="flex items-center space-x-3">
              <button onClick={(e)=>followUserFromProfile(user.id,e,setUser)} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5">
                {user.isFollowedByCurrentUser ? "Unfollow" : "Follow"}
              </button>
              <TfiMoreAlt />
            </div>
            <div className="flex gap-8">
            <div className="text-center cursor-pointer"
              >
                <div className="font-bold">{user.postsCount}</div>
                <div className="text-gray-600">Posts</div>
              </div>
              <div
                onClick={() => {
                  getfollowers(user.id, setFollowData);
                  setPopupTitle("Followers");
                  setPopupOpen(true);
                }}
                className="text-center cursor-pointer"
              >
             <div className="font-bold">{user.followersCount > 5000 ? `${(user.followersCount / 1000).toFixed(0)}K` : user.followersCount}</div>
                <div className="text-gray-600">followers</div>
              </div>
              <div
                onClick={() => {
                  getfolloweing(user.id, setFollowData);
                  setPopupTitle("Following");
                  setPopupOpen(true);
              
                }}
                className="text-center cursor-pointer"
              >
                <div className="font-bold">{user.followingCount}</div>
                <div className="text-gray-600">following</div>
              </div>
            </div>
          </div>
        </div>
      </div>
   {/* Skills & Interests */}
   <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.length > 0 ? user.skills.map((skill,index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              )) : <span className="text-gray-500">No skills listed</span>}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Currently Learning</h2>
            <div className="flex flex-wrap gap-2">
              {user.currentlyLearning.length > 0 ? user.currentlyLearning.map((skill,index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              )) : <span className="text-gray-500">Not learning anything</span>}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">My Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.length > 0 ? user.interests.map(interest => (
                <span key={interest} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              )) : <span className="text-gray-500">No interests listed</span>}
            </div>
          </div>
        </div>
      {/* Popup for Followers/Following */}
      {popupOpen && (
        <Popup title={popupTitle} data={followData} setdate={setFollowData} onClose={() => setPopupOpen(false)}/>
      )}
    </div>
  );
}

export default Profileusers;
