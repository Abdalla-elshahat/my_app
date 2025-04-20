function TopicCard({ topic }) {
  function getEmbedUrl(url) {
    const playlistMatch = url.match(/list=([a-zA-Z0-9_-]+)/);
    if (playlistMatch) {
      const playlistId = playlistMatch[1];
      return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
    }
  
    const videoMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
    if (videoMatch) {
      const videoId = videoMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  
    return null;
  }
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4"><a href={topic.topicName} target="_blank" rel="noopener noreferrer">{topic.topicName}</a></h2>

      {topic.resources.length > 0 ? (
        <ul className="space-y-6">
          {topic.resources.map((res, index) => {
            const embedUrl = getEmbedUrl(res.url);
            return (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
              >
                <div className="mb-3">
                  <p className="font-medium text-gray-800">{res.name}</p>
                  <p className="text-sm text-gray-600">{res.language.trim()}</p>
                  {embedUrl ? (
                  <div className="my-4">
                    <iframe
                      src={embedUrl}
                      title={`Video ${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-96 rounded"
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-red-500 text-sm">Invalid YouTube URL</p>
                )}
              <p className="text-sm text-gray-600">{res?.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No resources available for this topic.</p>
      )}
    </div>
  );
}

export default TopicCard;
