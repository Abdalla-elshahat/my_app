import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import { getallsaved, saveandunsaved } from "../../apicalls/podcasts";

function Savedpodcast({ onClose }) {
  const [saved, setsaved] = useState([]); // ✅ جعل الحالة مصفوفة فارغة بدلاً من undefined
  useEffect(() => {
    getallsaved(setsaved); // ✅ جلب البيانات مرة واحدة عند تحميل المكون
  }, []);

  const handleUnsave = async (podcastId) => {
    await saveandunsaved(parseInt(podcastId));
    getallsaved(setsaved);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity "
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 md:mx-auto p-6 bg-white shadow-lg rounded-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // يمنع إغلاق المودال عند النقر داخله
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
        >
          ❌
        </button>

        {/* عرض البودكاست */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
          {saved.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              🚫 No podcasts available
            </p>
          ) : (
            saved.map((podcast) => (
              <div
                key={podcast.podcastId}
                className="bg-gray-50 rounded-lg shadow-md p-4 transition hover:shadow-lg hover:scale-105 relative"
              >
                {/* زر إلغاء الحفظ */}
                <button
                  className="unSavepost absolute right-0 top-0"
                  onClick={() => handleUnsave(podcast.podcastId)} // ✅ تحديث القائمة بعد الحذف
                >
                  <CiCircleMinus className="text-[24px] text-[#4d4a4a]" />
                </button>
                
                <Link to={`/Podcasts/${parseInt(podcast.podcastId)}`}>
                  <img
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h4 className="text-lg font-medium mt-3 text-gray-800">
                    {podcast.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {podcast.description}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Savedpodcast;
