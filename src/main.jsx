import {  Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Podcasts from "./maincomponents/Podcasts/Podcasts";
import About from "./maincomponents/About/About";
import Contact from "./maincomponents/Contact/Contact";
import Login from "./maincomponents/Login/Login";
import SignUp from "./maincomponents/SignUp/SignUp";
import ForgetPassword from "./maincomponents/ForgotPassword/ForgotPassword";
import Repass from "./maincomponents/Repass/Repass";
import Verify from "./maincomponents/Verify/Verify";
import Verifyforget from "./maincomponents/Verifyforget/Verifyforget";
import Saved from "./components/Saved/Saved";
import PodcastsView from "./Podcustcomonents/Podcastview/Podcastview";
import Profileusers from "./components/profileusers/Profileusers";
import AddFriends from "./components/addFriends/addfriends";
import Profile from "./components/Profile/Profle";
import LearningForm from "./components/Profile/LearningForm";
import Roadmaps from "./components/Roadmaps/Roadmaps";
import SubTrack from "./components/Roadmaps/subtracks";
import TopicsList from "./components/Roadmaps/resourses/TopicsList";
import ChatBot from "./components/chatbot/chatbot";
function Main(){
    const[isopen, setIsOpen] = useState(false);
    return(
        <>
        <style jsx>{`
  @keyframes wave {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0.4);
    }
  }
  .animate-wave {
    animation: wave 2s infinite;
  }
`}</style>
        <div className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Podcasts" element={<Podcasts />} />
                <Route path="/Podcasts/:id" element={<PodcastsView />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/forgetpass" element={<ForgetPassword/>} />
                <Route path="/changepass" element={<Repass/>} />
                <Route path="/Verify" element={<Verify/>} />
                <Route path="/Verifyforget" element={<Verifyforget/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/profileusers/:id" element={<Profileusers/>} />
                <Route path="/AddFriends" element={<AddFriends/>} />
                <Route path="/learningForm" element={<LearningForm/>} />
                <Route path="/Roadmaps" element={<Roadmaps/>} />
                <Route path="/roadmap/:id" element={<SubTrack/>} />
                <Route path="/roadmap/subtrack/:id" element={<TopicsList/>} />
            </Routes>
<span className="fixed right-11 bottom-11 text-5xl bg-blue-500 text-white text-center rounded-full py-4 p-2 cursor-pointer shadow-lg animate-wave"
 onClick={()=>setIsOpen(!isopen)}>🤖</span>
{isopen && <ChatBot/>}
        </div>
        </>
    )
}
export default Main;