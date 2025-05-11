import { useEffect, useState } from "react";
import { Domain} from "../../utels/consts";
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { getNotifications, markAsRead } from "../../apicalls/navbar";
function Notification() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications(setNotifications);
  }, [notifications]);
  return (
    <div className="not w-80 max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg absolute md:-left-40 z-50 md:mt-5 sm:right-2 sm:mt-12 scroll-auto max-h-96 overflow-y-auto ">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id,setNotifications)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition  ${notification.isRead ? 'bg-gray-50' : 'bg-blue-200'}`}
            >
              <div className="relative">
                <img
                  src={`${Domain}/${notification.senderImage}`}
                  alt={notification.senderName}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="absolute bottom-0 left-0 bg-white p-0.5 rounded-full shadow">
                  {notification.type === "Like" && <FcLike className="text-red-500" />}
                  {notification.type === "Comment" && <FaCommentDots className="text-blue-500" />}
                  {notification.type === "Share" && <FaShare className="text-green-500" />}
                  {notification.type === "Follow" && <RiUserFollowFill className="text-purple-500" />}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{new Date(notification.createAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;