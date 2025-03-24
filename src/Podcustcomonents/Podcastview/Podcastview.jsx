import { FaBookmark, FaBackward, FaForward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { CgPlayPause } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineForward10 ,MdOutlineReplay10} from "react-icons/md";
import { RunPodcast } from "../../apicalls/podcasts";
export default function PodcastsView() {
  const [isPlay, setIsPlay] = useState(false);
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { id } = useParams();
  const audioRef = useRef(new Audio());

  useEffect(() => {
    RunPodcast(id,setData,audioRef,setDuration);
    // تحديث الوقت أثناء التشغيل
    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, [id]);

  const togglePlay = () => {
    if (!data?.audioUrl) return;
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const handleSkipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!data) {
    return <p className="text-center text-gray-500 mt-10">⏳ Loading podcast...</p>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-b-2xl rounded-t-2xl overflow-hidden mt-10">
      <div className="relative bg-blue-600 text-white py-6 px-4 rounded-b-2xl text-center pb-20">
        <h2 className="text-sm font-semibold">Podcast Details</h2>
        <FaBookmark className="absolute top-4 right-4 text-lg cursor-pointer" />
      </div>

      <div className="relative flex justify-center">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-32 h-32 rounded-lg shadow-lg absolute -top-10"
        />
      </div>

      <div className="pt-12 pb-6 px-6 bg-white rounded-b-2xl mt-10">
        <h3 className="text-center text-lg font-semibold mt-4">{data.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3 text-center">
          {data.description.split("\n")[0]}
        </p>

        {/* شريط التشغيل */}
        <div className="flex flex-col items-center my-3">
          <input
            type="range"
            className="w-full cursor-pointer"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="flex justify-between w-full text-sm text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-center gap-6 items-center mt-3">
          <FaBackward className="text-2xl text-gray-600 cursor-pointer" onClick={handleSkipBackward} />
          <MdOutlineReplay10 className="text-2xl text-gray-600 cursor-pointer" onClick={handleSkipBackward} />
          <div className="bg-blue-600 text-white p-4 rounded-full cursor-pointer" onClick={togglePlay}>
            {isPlay ? <CgPlayPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
          </div>
          <MdOutlineForward10 className="text-2xl text-gray-600 cursor-pointer" onClick={handleSkipForward} />
          <FaForward className="text-2xl text-gray-600 cursor-pointer" onClick={handleSkipForward} />
        </div>
      </div>
    </div>
  );
}
