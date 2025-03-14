import { React, useState } from "react";
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

function Profile() {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="relative ">
        <div className="h-48 bg-blue-600 w-full"></div>

        <div className="container absolute w-20 h-20  left-12 max-md:left-1/2 max-md:right-1/2  -bottom-15 rounded-full  overflow-hidden border-white bg-gray-200 -translate-y-1/2 -translate-x-1/2">
          <img
            src={imgSrc}
            alt="Profile"
            className="w-full h-full object-cover  "
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between max-[820px]:items-center max-[820px]:text-center  py-2">
          <div>
            <h1 className="text-2xl font-bold">Ismail</h1>
            <p className="text-gray-600 flex items-center gap-1 mt-1 max-[820px]:justify-center">
              <MapPin size={16} /> Egypt, Cairo
            </p>
            <p className="text-gray-600">UX/UI Designer</p>
          </div>
          <div className="flex flex-col items-center gap-5 mt-4 md:mt-0 max-[820px]:justify-center  ">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Follow
              </button>
              <div>
                <TfiMoreAlt />
              </div>
            </div>
            <div className="flex gap-8 mt-4 md:mt-0 max-[820px]:justify-center">
              <div className="text-center">
                <div className="font-bold">250</div>
                <div className="text-gray-600">posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold">2022</div>
                <div className="text-gray-600">followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">590</div>
                <div className="text-gray-600">following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {["Figma", "Photoshop", "Adobe XD", "After Effect"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Currently Learning</h2>
            <div className="flex flex-wrap gap-2">
              {["Wire-framing", "Prototyping", "Motion Design"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">My Interests</h2>
            <div className="flex flex-wrap gap-2">
              {["Sports", "Books", "Languages", "Movies"].map((interest) => (
                <span
                  key={interest}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-8 space-y-4">
          {[
            {
              title: "How can we learn UI/UX design in 2025?",
              reactions: 38,
              comments: 22,
            },
            {
              title:
                "Is Wireframing and Figma Still Necessary for No-Code Websites?",
              reactions: 24,
              comments: 16,
            },
            {
              title:
                "How can we find free courses/certifications to learn UX design?",
              reactions: 35,
              comments: 9,
            },
          ].map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <UserCircle2 className="w-8 h-8" />
                <div>
                  <div className="font-medium">Ismail</div>
                  <div className="text-gray-500 text-sm">Nov 30</div>
                </div>
              </div>
              {showDetails && (
                <h3 className="font-medium mb-3 ">{post.title}</h3>
              )}
              <button
                className="text-blue-600"
                onClick={() => setShowDetails((h) => !h)}
              >
                {showDetails ? "Hide" : "Show"} details
              </button>
              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <Heart size={16} /> {post.reactions} reactions
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={16} /> {post.comments} comments
                </span>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
