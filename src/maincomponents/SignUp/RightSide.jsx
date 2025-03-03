import { useContext, useState } from "react";
import SocialLogin from "./SocialLogin";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import LoadingIcons from 'react-loading-icons';
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { EmailContext } from "../../App";
function RightSide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const { Setemail } = useContext(EmailContext); // استخدام الكونتكست
  const navigate = useNavigate();
  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
  async function signup(e) {
    e.preventDefault();
    setError("");
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://arabdevcommunity.runasp.net/api/Account/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: name,
          email: email,
          password: password,
        }),
      });
      setLoading(false);
      if (response.ok) {
        Setemail(email); 
        toast.success("OTP has been sent to your email.", { icon: <FaCheckCircle color="green" /> });
        setTimeout(() => {
          navigate("/Verify");
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Error during signup: ${errorData.message || "Unknown error"}`, { icon: <FaExclamationCircle color="red" /> });
      }
    } catch (error) {
      setLoading(false);
      setError("Error signing up. Please try again.");
    }
  }
  return (
    <div className="w-full md:w-3/5 my-auto px-4 md:px-0">
       <ToastContainer />
      <div className="max-w-md mx-auto">
        <form onSubmit={signup}>
          <div className="mt-10 relative">
            <label htmlFor="name" className="block text-md font-bold text-[#939393] mb-2">Name</label>
            <AiOutlineUser className="absolute left-3 top-[44px] text-[18px] text-gray-500" />
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Your Name" required />
          </div>

          <div className="my-5 relative">
            <label htmlFor="email" className="block text-md font-bold text-[#939393] mb-2">Email</label>
            <MdOutlineEmail className="text-[17px] absolute left-3 top-[45px] text-gray-500" />
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Your Email" required />
          </div>

          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-md font-bold text-[#939393] mb-2">Password</label>
            <CiLock className="text-[17px] absolute left-3 top-[45px] text-gray-800" />
            <input type={show ? "password" : "text"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Your Password" required />
            <span>
              {show ?
                <IoMdEyeOff className="text-[17px] absolute right-3 top-[45px] text-gray-800 cursor-pointer" onClick={() => setShow(!show)} /> :
                <IoEye className="text-[17px] absolute right-3 top-[45px] text-gray-800 cursor-pointer" onClick={() => setShow(!show)} />}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-md font-medium text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
            {loading ? <LoadingIcons.SpinningCircles /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">Log in</Link>
        </div>
        <SocialLogin />
      </div>
    </div>
  );
}
export default RightSide;