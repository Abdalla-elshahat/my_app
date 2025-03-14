import { Domain, token } from "../utels/consts";
import { toast } from "react-toastify";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
export  const contact = async (e,name,email,message,nav,setError, setLoading) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
        setError(true)
      const response = await fetch(`${Domain}/api/Contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, message }),
      });
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Error during send message: ${errorData.message || "Unknown error"}`,
          {
            icon: <FaExclamationCircle color="red" />,
          }
        );
      }

      const result = await response.json();
      toast.success(result.message, {
        icon: <FaCheckCircle color="green" />,
      });
      setTimeout(() => {
        nav("/home");
      }, 1000);
    } catch (error) {
        setLoading(false);
        setError("Error sending message Please try again.");
    }
  };