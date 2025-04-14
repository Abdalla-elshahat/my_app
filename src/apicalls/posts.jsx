import { Domain, token } from "../utels/consts";

  export const getAllPosts = async (setPosts) => {
    try {
      const response = await fetch(`${Domain}/api/Share/posts-with-shares`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }
  
      const result = await response.json();
      setPosts(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };