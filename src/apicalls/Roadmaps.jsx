import { Domain, token } from "../utels/consts";

export const getallTracks=async (setdata)=>{
    const response=await fetch(`${Domain}/api/Roadmap`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    });
    const data=await response.json();
    console.log(data.data);
    setdata(data.data);
}
export const getallsubTracks=async (id,setData)=>{
    const response=await fetch(`${Domain}/api/Roadmap/SubTracks/ByTrack/${id}`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    });
    const data=await response.json();
    console.log(data.data);
    setData(data.data);
}
export   const getTopics=async function (id,setData) {
    const response = await fetch(`${Domain}/api/Roadmap/TopicsWithResources/BySubTrack/${id}`);
    const topics = await response.json();
    console.log(topics.data);
    setData(topics.data);
  }