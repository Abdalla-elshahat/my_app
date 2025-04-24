import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { useParams } from "react-router-dom";
import { getTopics } from "../../../apicalls/Roadmaps";
function TopicsList() {
  const [data, setData] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    getTopics(id,setData);
  }
  , [id]);
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Resources</h1>
      {data?(data.map((topic, idx) => (
        <TopicCard key={idx} topic={topic} />
      ))):(
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-center mb-6">No Topics Found</h1>
        </div>
      ) }
    </div>
  );
}

export default TopicsList;
