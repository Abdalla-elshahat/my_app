// components/Roadmaps.js
import React, { useEffect, useState } from 'react';
import { getallTracks } from '../../apicalls/Roadmaps';
import { Link } from 'react-router-dom';
import { Domain } from '../../utels/consts';
const Roadmaps = () => {
const [data,setdata]=useState();
useEffect(()=>{
getallTracks(setdata);
},[])
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-semibold mb-6 text-blue-800">Roadmaps</h2>
    <div className="space-y-4">
      {data?.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 shadow-md rounded-lg flex flex-col sm:flex-row items-center p-4 gap-4"
        >
          <img src={`${Domain}/${item.imageUrl}`} alt={item.name} className="w-24 h-24 object-cover rounded"/>
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600">{item?.description}</p>
            <p className="border border-blue-500 text-blue-500 bg-white font-medium text-sm rounded px-3 py-1 inline-block w-fit mx-auto sm:mx-0">
              {item.subTrackCount} subTrack
            </p>
          </div>
          <button className="bg-white hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded mt-2 sm:mt-0">
            <Link to={`/roadmap/${item.id}`}>
            Learn more
            </Link>
          </button>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Roadmaps;
