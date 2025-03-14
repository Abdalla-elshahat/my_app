import { toast } from "react-toastify";
import { Domain, token } from "../utels/consts";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

  // دالة لجلب المستخدمين
 export const getAllUsers = async (setUsers) => {
    try {
      const response = await fetch(`${Domain}/api/User`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error fetching users: ${errorData.message || "Unknown error"}`, {
          icon: <FaExclamationCircle color="red" />,
        });
        return;
      }

      const result = await response.json();
      setUsers(result.data);
      console.log(result.data)
      toast.success(result.message, {
        icon: <FaCheckCircle color="green" />,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // دالة المتابعة
 export const followUser = async (id,e,setUsers) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Domain}/api/Follower/Follow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error following user: ${errorData.message || "Unknown error"}`, {
          icon: <FaExclamationCircle color="red" />,
        });
        return;
      }

      const result = await response.json();
      toast.success(result.message, {
        icon: <FaCheckCircle color="green" />,
      });

      // تحديث حالة المتابعة بعد نجاح الطلب
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isFollowedByCurrentUser: !user.isFollowedByCurrentUser } : user
        )
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  // دالة المتابعة
  export const followUserFromProfile = async (id, e, setUser) => {
    e.preventDefault();
    try {
      const response = await fetch(`${Domain}/api/Follower/Follow/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error following user: ${errorData.message || "Unknown error"}`, {
          icon: <FaExclamationCircle color="red" />,
        });
        return;
      }
  
      const result = await response.json();
      toast.success(result.message, {
        icon: <FaCheckCircle color="green" />,
      });
  
      setUser((prevUser) => ({
        ...prevUser,
        isFollowedByCurrentUser: !prevUser.isFollowedByCurrentUser,
        followersCount: prevUser.isFollowedByCurrentUser
          ? prevUser.followersCount - 1
          : prevUser.followersCount + 1,
      }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };  

  export const getprofileuser = async (id, setUsers) => {
    try {
      const response = await fetch(`${Domain}/api/Profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error fetching user: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const result = await response.json();
      setUsers(result.data);
      toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };

  export const getfollowers = async (id, setfollowdata) => {
    try {
      const response = await fetch(`${Domain}/api/Follower/GetFollowers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error fetching user: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const result = await response.json();
      setfollowdata(result.data);
    //   toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };
  
  export const getfolloweing = async (id, setfollowdata) => {
    try {
      const response = await fetch(`${Domain}/api/Follower/GetFollowing/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error fetching user: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const result = await response.json();
      setfollowdata(result.data);
    //   toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };