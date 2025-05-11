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
          user.id === id ? { ...user, isFollowedByMe: !user.isFollowedByMe } : user
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

    export const getmyfollowers = async ( setfollowdata) => {
    try {
      const response = await fetch(`${Domain}/api/Follower/my-followers`, {
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
  
  export const getmyfolloweing = async ( setfollowdata) => {
    try {
      const response = await fetch(`${Domain}/api/Follower/my-following`, {
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
      console.log(result.data)
    //   toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };

  export const getpostsandsharebyuser = async (id, setposts) => {
    try {
      const response = await fetch(`${Domain}/api/Share/posts-with-shares/${id}`, {
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
      setposts(result.data);
    //   toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };

  export const getprofile = async (id, setprofile) => {
    try {
      const response = await fetch(`${Domain}/api/Profile/UserProfile`, {
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
      setprofile(result.data);
    //   toast.success(result.message);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Failed to fetch user data");
    }
  };