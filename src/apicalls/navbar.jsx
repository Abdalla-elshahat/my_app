import axios from "axios";
import { Domain, token } from "../utels/consts";

export function getProfile(setUserName, setUserPicture) {
  axios
    .get(`${Domain}/api/Profile/UserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUserName(res.data.data.displayName);
      setUserPicture(res.data.data.pictureUrl);
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });
}
// GetCurrentUser endpoint
export function getEmail(setUserEmail) {
  axios
    .get(`${Domain}/api/Account/GetCurrentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUserEmail(res.data.email);
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });
}

 export const getNotifications = async (setNotifications) => {
    try {
      const response = await fetch(`${Domain}/api/notifications/my-notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch notifications");
      const result = await response.json();
      setNotifications(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  export const markAsRead = async (id,setNotifications) => {
    try {
      const response = await fetch(`${Domain}/api/notifications/mark-as-read/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to mark notification as read");
      setNotifications((prev) => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.log(error);
    }
  };