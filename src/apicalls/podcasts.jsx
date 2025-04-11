import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Domain, token } from "../utels/consts";
import { toast } from "react-toastify";

  export const getforyou = async (setforyou) => {
    try {
      const response = await fetch(`${Domain}/api/PodCast/sub-categories/For You`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }
      const result = await response.json();
      setforyou(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  export const gettopshows = async (settopshows) => {
    try {
      const response = await fetch(
        `${Domain}/api/PodCast/sub-categories/Top Show`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }
      const result = await response.json();
      settopshows(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  export const getPodcast = async (data,setPodcasts) => {
      if (!data) return;
      try {
        const response = await fetch(`${Domain}/api/PodCast/fetch-and-save/${data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
        }
        const result = await response.json();
        setPodcasts(result.podcasts);
      } catch (error) {
        console.log(error);
      }
  };
  export const RunPodcast = async (id,setData,audioRef,setDuration) => {
        try {
          const response = await fetch(`${Domain}/api/PodCast/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
          }
          const result = await response.json();
          setData(result);
          if (result.audioUrl) {
            
            audioRef.current.src = result.audioUrl;
            audioRef.current.addEventListener("loadedmetadata", () => {
              setDuration(audioRef.current.duration);
            });
           
          }
        } catch (error) {
          console.log(error);
        }
  };
  export const saveandunsaved = async (id) => {
      try {
        const response = await fetch(`${Domain}/api/SavedPodCat/toggle/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(
            `Error following user: ${errorData.message || "Unknown error"}`,
            {
              icon: <FaExclamationCircle color="red" />,
            }
          );
          return;
        }
        const result = await response.json();
        toast.success(result.message, {
          icon: <FaCheckCircle color="green" />,
        });
      } catch (error) {
        console.log(error);
      }
  };
  export const getallsaved = async (setsaved) => {
      try {
        const response = await fetch(`${Domain}/api/SavedPodCat/saved-podcast`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(
            `Error fetching podcasts: ${errorData.message || "Unknown error"}`,
            { icon: <FaExclamationCircle color="red" /> }
          );
          return;
        }
  
        const result = await response.json();
        setsaved(result.data || []); // ✅ تأكد من أن القيمة المخزنة مصفوفة دائماً
        console.log(result.data);
      } catch (error) {
        console.error("❌ Error fetching saved podcasts:", error);
      }
    };