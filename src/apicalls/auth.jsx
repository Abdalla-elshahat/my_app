import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Domain } from "../utels/consts";
// التحقق من كلمة المرور
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}
// دالة التسجيل
export async function signup(e, name, password, email, setError, setLoading, Setemail, navigate) {
  e.preventDefault();
  setError("");

  if (!validatePassword(password)) {
    setError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      `${Domain}/api/Account/SignUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ displayName: name, email, password }),
      }
    );

    setLoading(false);

    if (response.ok) {
      Setemail(email);
      toast.success("OTP has been sent to your email.", {
        icon: <FaCheckCircle color="green" />,
      });
      setTimeout(() => {
        navigate("/Verify");
      }, 1000);
    } else {
      const errorData = await response.json();
      toast.error(`Error during signup: ${errorData.message || "Unknown error"}`, {
        icon: <FaExclamationCircle color="red" />,
      });
    }
  } catch (error) {
    setLoading(false);
    setError("Error signing up. Please try again.");
  }
}
// دالة التحقق من OTP عند نسيان كلمة المرور
export async function verifyForget(e, email, otpCode, setError, setLoading, navigate) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      `${Domain}/api/Account/VerifyOtpForResetPassword`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode }),
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
      toast.error(`Error during verification: ${errorData.message || "Unknown error"}`, {
        icon: <FaExclamationCircle color="red" />,
      });
    }
  } catch (error) {
    setLoading(false);
    setError("Error verifying. Please try again.");
  }
}
// عند تسجيل الدخول دالة إعادة إرسال OTP
export async function resendOTPS(e, email, setError, setLoading) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      `${Domain}/api/Account/ResendOtp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    setLoading(false);

    if (response.ok) {
      toast.success("OTP is resent successfully", {
        icon: <FaCheckCircle color="green" />,
      });
    } else {
      const errorData = await response.json();
      toast.error(`Error during verification: ${errorData.message || "Unknown error"}`, {
        icon: <FaExclamationCircle color="red" />,
      });
    }
  } catch (error) {
    setLoading(false);
    setError("Error verifying. Please try again.");
  }
}
// عند نسيان الباسورد الدخول دالة إعادة إرسال OTP
export async function ResendOTPF(e, email, setError, setLoading) {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const response = await fetch(`${Domain}/api/Account/SendOtpForPassword`,
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
//تاكيد عمل الايميل 
export async function verify(e,  email, setError, setLoading,otpCode, navigate) {
  e.preventDefault();
  setError("");
  setLoading(true);
  const otpString = otpCode.join(""); // تحويل المصفوفة إلى نص

  try {
    const response = await fetch(`${Domain}/api/Account/VerifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
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
        navigate("/login");
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
//تسجيل الدخول
export async function Login(e,  password, email, setError, setLoading, Setemail, navigate) {
  e.preventDefault();
  setError("");

  if (!validatePassword(password)) {
    setError(
      "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character."
    );
    return;
  }
  setLoading(true);
  try {
    const response = await fetch(
      `${Domain}/api/Account/Login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      Setemail(email)
      Cookies.set("token", data.token);
      toast.success("Logged in successfully", { icon: <FaCheckCircle color="green" /> });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      const errorData = await response.json();
      toast.error(`Error during login: ${errorData.message || "Unknown error"}`, {
        icon: <FaExclamationCircle color="red" />,
      });
    }
  } catch (error) {
    setLoading(false);
    setError("Error logging in. Please try again.");
  }
}

export async function ForgetPassword(e, email, setError, setLoading, Setemail, navigate) {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    const response = await fetch(
      `${Domain}/api/Account/ForgetPassword`,
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

export async function verifyforget(e, email, setError, setLoading,otpCode, navigate) {
  e.preventDefault();
  setError("");
  setLoading(true);
  const otpString = otpCode.join(""); // تحويل المصفوفة إلى نص
  console.log(email)
  try {
    const response = await fetch(`${Domain}/api/Account/VerifyOtpForResetPassword`,
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

export async function changePassword(e,confirmpassword, password, email, setError, setLoading, navigate) {
  e.preventDefault();
  setError("");
  if (!validatePassword(password)) {
    setError("Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
    return;
  }
  if (password !== confirmpassword) {
    setError("Passwords do not match!");
    return;
  }
  setLoading(true);
  try {
    const response = await fetch(`${Domain}/api/Account/ResetPassword`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email:email, 
          newPassword:password 
        }),
      }
    );
    setLoading(false);
    if (response.ok) {
      toast.success("Your password is changed", {
        icon: <FaCheckCircle color="green" />,
      });
      setTimeout(() => navigate("/login"), 1000);
    } else {
      const errorData = await response.json();
      toast.error(`Error: ${errorData.message || "Unknown error"}`, {
        icon: <FaExclamationCircle color="red" />,
      });
    }
  } catch {
    setLoading(false);
    setError("Error signing up. Please try again.");
  }
}

export async function Logout(e, setError, setLoading, navigate) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    Cookies.remove("token"); // احذف التوكن
    setLoading(false);

    toast.success("Logged out successfully", {
      icon: <FaCheckCircle color="green" />,
    });
setTimeout(() => {
      navigate("/login");
    }
    , 1000); // ✅ استخدم setTimeout لتأخير الانتقال
  } catch (error) {
    setLoading(false);
    setError("Error Logged out. Please try again.");
    toast.error(`Error: ${error.message || "Unknown error"}`, {
      icon: <FaExclamationCircle color="red" />,
    });
  }
}
