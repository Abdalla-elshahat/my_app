import { useState, useRef, useEffect } from "react";
import { handleSubmit } from "../../../apicalls/posts";
import { FaImage, FaMapMarkerAlt } from "react-icons/fa";
import { getProfile } from "../../../apicalls/profile";

const AddPost = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [details, setdetails] = useState([]);
  const [Photo, setNewPhot] = useState("");
  const [learning, setLearning] = useState([]);
  useEffect(() => {
    getProfile(setdetails, setNewPhot,setLearning);
  },[]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full  mt-6">
      <form
        onSubmit={(e) =>
          handleSubmit(e,title,images,setTitle,setImages,setLoading,setMessage,onPostAdded)
        }
      >
        <div className="flex items-start gap-3 mb-3">
          {/* User Avatar */}
          <img
            src={Photo}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Textarea */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write something here ..."
            className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Image Upload & Location Icons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center gap-1 text-blue-500 text-xl hover:underline"
            >
              <FaImage />
              <span>Photo</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-gray-500 cursor-not-allowed text-xl"
              disabled
            >
              <FaMapMarkerAlt />
              <span>Location</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="bg-blue-600 text-white px-5 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Feedback Message */}
        {message && (
          <div className="text-center text-sm text-gray-700 mt-2">{message}</div>
        )}

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {images.map((image, idx) => (
              <div key={idx} className="w-24 h-24 overflow-hidden rounded-md shadow">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPost;
