import { Domain } from "../../../utels/consts";

function TopicCard({ topic }) {
  if (!topic) {
    return <p className="text-red-500">Topic not found.</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md mb-4 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{topic.topicName}</h2>
      {/* Topic Card */}
      {topic.resources && topic.resources.length > 0 ? (
        topic.resources.map((res, index) => (
       <div
  key={index}
  className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-3xl mx-auto mb-8 border border-gray-200 flex flex-col sm:flex-row p-2 transition-transform transform hover:scale-105 duration-300 ease-in-out"
>
  <img
    src={`${Domain}/${res.imageUrl}`}
    alt="Topic"
    className="w-full sm:w-1/2 h-72 object-cover rounded-2xl shadow-lg"
  />
  <div className="p-6 w-full sm:w-1/2">
    <h2 className="text-xl font-bold text-indigo-700 mb-3">{res.name}</h2>
    <p className="text-gray-700 mb-4">
      {res.description?.substring(0, 150)}...
    </p>
    <a href={res.url} target="_blank" rel="noopener noreferrer">
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
        {res.type === "Video"
          ? "Watch Video"
          : res.type === "Article"
          ? "Read Article"
          : res.type === "Book"
          ? "Download Book"
          : "View Resource"}
      </button>
    </a>
  </div>
</div>

        ))
      ) : (
        <p className="text-gray-500 italic mt-4">No resources available for this topic.</p>
      )}
    </div>
  );
}

export default TopicCard;
