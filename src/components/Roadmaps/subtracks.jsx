import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { getallsubTracks } from "../../apicalls/Roadmaps";
import { Domain } from "../../utels/consts";
function SubTrack() {
const {id}=useParams();
const [data, setData] = useState([]);
useEffect(()=>{
    getallsubTracks(id,setData);
},[id])
    return (
        <div className="p-6">
            <Navbar />
            <h2 className="text-2xl font-semibold mb-6 text-blue-800">Roadmaps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((theme, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md  flex flex-col items-center text-center">
                        <img src={`${Domain}/${theme.imageUrl}`} alt={theme.name} className="h-full object-contain" />
                        <span className="bg-gray-100 w-full p-2">
                        <h3 className="text-3xl font-semibold text-left">{theme.name}</h3>
                        <span className="flex flex-row items-center justify-between">
                        <p className="text-gray-500 mb-4">{theme.topicsCount} Topics</p>
                        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">
                            <Link to={`/roadmap/subtrack/${theme.id}`} className="hover:text-blue-600">Start Now</Link>
                            </button>
                        </span>
                        </span>
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubTrack;
