import { Heart, MessageCircle, Share2 } from "lucide-react"
import { getGridClass, getImageClass } from "../../apicalls/logics"
import { Domain } from "../../utels/consts"
import { useState } from "react";
function Postsusers({posts}){
    const [showDetails, setShowDetails] = useState(true);
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
    return(
        <>
              {/* Posts */}
              <div className="mt-8 space-y-6">
                {posts?.map((sharedPost) => (
                  <div
                    key={sharedPost.id}
                    className="bg-white p-4 rounded-lg shadow-sm border"
                  >
                    {sharedPost.type === "Post" ? (
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={`${Domain}${sharedPost.user.pictureUrl}`}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium">
                              {sharedPost.user.displayName}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {formatFacebookDate(sharedPost.postDate)}
                            </div>
                          </div>
                        </div>
                        {showDetails && (
                          <h3 className="font-medium mb-3">{sharedPost.title}</h3>
                        )}
                        {sharedPost.images && (
                          <div className={`grid gap-1 ${getGridClass(sharedPost.images.length)}`}>
                            {sharedPost.images.map((photo, i) => (
                              <img
                                key={i}
                                src={`${Domain}${photo}`}
                                alt="Post"
                                className={`w-full h-full object-cover rounded-lg ${getImageClass(sharedPost.images.length, i)}`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <h3 className="mb-2 font-semibold">Shared a post</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={`${Domain}${sharedPost.sharedFrom.user.pictureUrl}`}
                            alt="Shared user"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium">
                              {sharedPost.sharedFrom.user.displayName}
                            </div>
                          </div>
                        </div>
                        {sharedPost.sharedFrom.title && (
                          <h3 className="font-medium mb-3">{sharedPost.sharedFrom.title}</h3>
                        )}
                      </>
                    )}
                    <button
                      className="text-blue-600"
                      onClick={() => setShowDetails((prev) => !prev)}
                    >
                      {showDetails ? "Hide" : "Show"} details
                    </button>
        
                    <div className="flex items-center gap-6 text-gray-500 text-sm mt-3">
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
                ))}
              </div>
        </>
    )
}
export default Postsusers