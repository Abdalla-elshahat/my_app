import { FaBookmark, FaBackward, FaPlay, FaForward } from "react-icons/fa";
import { MdOutlineReplay10 } from "react-icons/md";
import { CgPlayPause } from "react-icons/cg";
import { useState } from "react";
export default function PodcastsView() {
  const [isplay,setisplay]=useState(false);
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-b-2xl rounded-t-2xl overflow-hidden mt-10">
      {/* العنوان */}
      <div className="relative bg-blue-600 text-white py-6 px-4 rounded-b-2xl text-center pb-20">
        <h2 className="text-sm font-semibold">Podcast Details</h2>
        <FaBookmark className="absolute top-4 right-4 text-lg cursor-pointer" />
      </div>

      {/* صورة البودكاست - تطفو قليلاً فوق البوكس */}
      <div className="relative flex justify-center">
        <img
          src="https://s3-alpha-sig.figma.com/img/69ce/e804/9f9b0b428e5408241dab8a8e34007042?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KZMsclVvrk9pxaW6Sgq7uad286clkezFqjCgFCpp8CQFi4s21YQ9P1Wretcjp-6D8Ielh07Yl74xI82I4NsB~DbhYaNaBDxmo5Tj46YmHCUpyucDOPmlOTeXs4Ty~kVC31B5J7I7WJXfT4VBZsGwGe8e96T15jCUJaQEtr2gQiXHRxprBdPwuyjbxTsR2UZ142u~uLnhjYmI74JnwsRm-m-i5ruTompD7VhQz3bjfvHuEJDrXxzEN8-dAJRFL~ewdEgYtyzLS2JIpwrIc-CfGIHyFTcu0nUFmoNcasLBijuZfV00jKkyc9ewWWas18wD8jTpV0B7TxQevjUwXbDVEQ__"
          alt="Podcast Cover"
          className="w-32 h-32 rounded-lg shadow-lg absolute -top-10"
        />
      </div>

      <div className="pt-12 pb-6 px-6 bg-white rounded-b-2xl mt-10">
        {/* اسم البودكاست */}
        <h3 className="text-center text-lg font-semibold mt-4">Data Science at Home</h3>

        {/* شريط التشغيل */}
        <div className="flex flex-col items-center my-3">
          <input type="range" className="w-full cursor-pointer" />
          <div className="flex justify-between w-full text-sm text-gray-500 mt-1">
            <span>19:42</span>
            <span>30:28</span>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-center gap-6 items-center mt-3">
          <FaBackward className="text-2xl text-gray-600 cursor-pointer" />
          <div className="bg-blue-600 text-white p-4 rounded-full cursor-pointer">
            {
              isplay? (<FaPlay className="text-2xl"  onClick={()=>setisplay(!isplay)}/>):( <CgPlayPause className="text-2xl"  onClick={()=>setisplay(!isplay)}/>)
            }
           
           
          </div>
          <FaForward className="text-2xl text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
