import {FaBookmark,FaBackward,FaForward} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { FaRegBookmark } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { CgPlayPause } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";
import { RunPodcast, saveandunsaved, togglePlay } from "../../apicalls/podcasts";
import { ToastContainer } from "react-toastify";
export default function PodcastsView() {
  const [isPlay, setIsPlay] = useState(false);
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [Saved, setSaved] = useState(false);
  const { id } = useParams();
  const audioRef = useRef(new Audio());
  useEffect(() => {
    RunPodcast(id, setData, audioRef, setDuration);
    // تحديث الوقت أثناء التشغيل
    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    audioRef.current.addEventListener("timeupdate", updateTime);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, [id]);
useEffect(() => {
},[setSaved])
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
    return (
      <p className="text-center text-gray-500 mt-10">⏳ Loading podcast...</p>
    );
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-b-2xl rounded-t-2xl overflow-hidden mt-10">
      <style>
{`
  .marquee {
    overflow: hidden;
    white-space: nowrap;
  }

  .marquee p {
    display: inline-block;
    padding-left: 100%;
    animation: scrollText 10s linear infinite;
  }

  @keyframes scrollText {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
`}
</style>
      <ToastContainer/>
      <div className="relative bg-blue-600 text-white py-6 px-4 rounded-b-2xl text-center pb-20">
        <Marquee>
       <h2 className="text-center text-lg font-semibold mt-4 text-white">{data.title}</h2>
        </Marquee>
        {
          Saved.isSaved ? (
                   <FaBookmark
          onClick={() => {saveandunsaved(id,setSaved);}}
          className="absolute top-4 right-4 text-lg cursor-pointer"
        />
          ) : (
                  <FaRegBookmark
          onClick={() => {saveandunsaved(id,setSaved);}}
          className="absolute top-4 right-4 text-lg cursor-pointer"
        />
          )
        }

      </div>

      <div className="relative flex justify-center">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-32 h-32 rounded-lg shadow-lg absolute -top-10"
        />
      </div>

      <div className="pt-12 pb-6 px-6 bg-white rounded-b-2xl mt-10">

    
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
          <FaBackward
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={handleSkipBackward}
          />
          <MdOutlineReplay10
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={handleSkipBackward}
          />
          <div
            className="bg-blue-600 text-white p-4 rounded-full cursor-pointer"
            onClick={() => togglePlay(setIsPlay, audioRef, isPlay, data)}

          >
            {isPlay ? (
              <CgPlayPause className="text-2xl" />
            ) : (
              <FaPlay className="text-2xl" />
            )}
          </div>
          <MdOutlineForward10
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={handleSkipForward}
          />
          <FaForward
            className="text-2xl text-gray-600 cursor-pointer"
            onClick={handleSkipForward}
          />
        </div>
      </div>
    </div>
  );
}
