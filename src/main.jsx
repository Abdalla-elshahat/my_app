import {  Route, Routes, useNavigate } from "react-router-dom";
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

function Main(){
    return(
        <>
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
                
            </Routes>
        </div>
        </>
    )
}
export default Main;