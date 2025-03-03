import { useContext, useState } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ استخدام useNavigate
import { toast } from "react-toastify";
import LoadingIcons from "react-loading-icons";
import { EmailContext } from "../../App";

export default function RightSide() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ تعريف useNavigate
 const { Setemail } = useContext(EmailContext); // استخدام الكونتكست
  async function ForgetPassword(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "http://arabdevcommunity.runasp.net/api/Account/ForgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      setLoading(false);
      if (response.ok) {
        Setemail(email)
        toast.success("OTP has been sent to your email.", {
          icon: <FaCheckCircle color="green" />,
        });

        setTimeout(() => {
          navigate("/Verifyforget"); // ✅ استخدام navigate بدلاً من Navigate()
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(
          `Error during signup: ${errorData.message || "Unknown error"}`,
          { icon: <FaExclamationCircle color="red" /> }
        );
      }
    } catch (error) {
      setLoading(false);
      setError("Error signing up. Please try again.");
    }
  }

  return (
    <div className="w-full md:w-3/5 px-4 md:px-0 mt-8">
      <div className="max-w-md mx-auto">
        <p className="text-gray-500 text-[22px]">
          We will send you a One Time Password on{" "}
          <span className="sm:block text-center"> this Email</span>
        </p>

        <form className="space-y-7 mt-12" onSubmit={ForgetPassword}>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-[#939393] mb-2"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Your Email"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-md font-medium text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? <LoadingIcons.SpinningCircles /> : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
