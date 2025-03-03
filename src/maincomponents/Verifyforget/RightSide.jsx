import { useContext, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { EmailContext } from "../../App";
function RightSide() {
  const [otpCode, setOtpCode] = useState(["", "", "", "","",""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useContext(EmailContext); // جلب الإيميل من الكونتكست
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // يسمح بإدخال رقم واحد فقط في كل حقل
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // الانتقال تلقائيًا للحقل التالي إذا تم إدخال رقم
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };
  async function verifyforget(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const otpString = otpCode.join(""); // تحويل المصفوفة إلى نص
    console.log(email)
    try {
      const response = await fetch("http://arabdevcommunity.runasp.net/api/Account/VerifyOtpForResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otpCode: otpString,
          }),
        }
      );
      setLoading(false);
      if (response.ok) {
        toast.success("Email successfully verified", {
          icon: <FaCheckCircle color="green" />,
        });
        setTimeout(() => {
          navigate("/changepass");
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error during verification: ${errorData.message || "Unknown error"}`,
          { icon: <FaExclamationCircle color="red" /> }
        );
      }
    } catch (error) {
      setLoading(false);
      setError("Error verifying. Please try again.");
    }
  }
  async function ResendOTP(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://arabdevcommunity.runasp.net/api/Account/ResendOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      setLoading(false);
      if (response.ok) {
        toast.success("Otp is resend successfully", {
          icon: <FaCheckCircle color="green" />,
        });
      } else {
        const errorData = await response.json();
        toast.error(
          `Error during verification: ${errorData.message || "Unknown error"}`,
          { icon: <FaExclamationCircle color="red" /> }
        );
      }
    } catch (error) {
      setLoading(false);
      setError("Error verifying. Please try again.");
    }
  }
  return (
    <div className="w-full md:w-3/5 px-4 md:px-0 mt-8">
       <ToastContainer />
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-500 text-[21px]">
          Enter the OTP sent to your Email
        </p>
        <form className="space-y-7 mt-12" onSubmit={verifyforget}>
          <div className="flex justify-between w-3/4 mx-auto">
            {otpCode.map((num, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={num}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-[50px] h-[50px] text-center bg-gray-200 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                maxLength="1"
              />
            ))}
          </div>
          <button  onClick={ResendOTP}>Resend OTP?</button>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-md text-[18px] text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RightSide;
