import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { Domain } from "../../../utels/consts";
import { useParams } from "react-router-dom";

function TopicsList() {
  const [data, setData] = useState([]);
  const {id} = useParams();
  const getTopics=async function (id) {
    const response = await fetch(`${Domain}/api/Roadmap/TopicsWithResources/BySubTrack/${id}`);
    const topics = await response.json();
    setData(topics.data);
  }
  useEffect(() => {
    getTopics(id);
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
