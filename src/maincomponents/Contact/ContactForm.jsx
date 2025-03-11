import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { contact } from "../../apicalls/contact";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  return (
    <div className="w-full lg:w-2/3 bg-gray-200 p-5 sm:p-8 rounded-lg">
      <ToastContainer />
      <form
        className="space-y-4"onSubmit={(e) => {contact(e,name,email,message,nav,setError, setLoading);}}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end">
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full sm:w-32 bg-[#4169E1] text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors"
          >
        {loading ? "loading...": "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
