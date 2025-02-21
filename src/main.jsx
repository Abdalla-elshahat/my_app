import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Podcasts from "./maincomponents/Podcasts/Podcasts";
import About from "./maincomponents/About/About";
import Contact from "./maincomponents/Contact/Contact";
import Login from "./maincomponents/Login/Login";
import SignUp from "./maincomponents/SignUp/SignUp";
import ForgetPassword from "./maincomponents/ForgotPassword/ForgotPassword";
import Repass from "./maincomponents/Repass/Repass";
import Verify from "./maincomponents/Verify/Verify";
import Profile from "./components/Profile/Profle";
import Saved from "./components/Saved/Saved";
function Main(){
    return(
        <>
        <div className="main">
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Podcasts" element={<Podcasts />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/forgetpass" element={<ForgetPassword/>} />
                <Route path="/repass" element={<Repass/>} />
                <Route path="/Verify" element={<Verify/>} />
                <Route path="/saved" element={<Saved/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </div>
        </>
    )
}
export default Main;