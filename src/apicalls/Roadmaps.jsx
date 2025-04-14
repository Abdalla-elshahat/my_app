import { Domain } from "../utels/consts";

export const getallTracks=async (setdata)=>{
    const response=await fetch(`${Domain}/api/Roadmap`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
        }
    });
    const data=await response.json();
    console.log(data.data);
    setdata(data.data);
}