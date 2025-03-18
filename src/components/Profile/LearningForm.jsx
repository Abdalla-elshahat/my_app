import { useState, useEffect } from "react";
import axios from "axios";
import { Domain, token } from "../../utels/consts";
import { useNavigate } from "react-router-dom";

export default function LearningForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [learningId, setLearningId] = useState(null);
  const [learningData, setLearningData] = useState(null);

  const navigate =useNavigate()

  const [formData, setFormData] = useState({
    school: "Tanta University",
    degree: "Bachelor of Science - BS",
    startDte: "2021-09",
    endDte: "2025-07",
    grade: 4,
    activities: "",
    description:
      "I'm currently a student at Faculty of Computers and Informatics, Tanta University. I'm interested in Computer Science and Problem Solving.",
  });

  // Retrieve `learningId` from localStorage when the component mounts
  useEffect(() => {
    const storedId = localStorage.getItem("learningId");
    if (storedId) {
      setLearningId(storedId);
    }
  }, []);

  // Fetch learning data when `learningId` is set
  useEffect(() => {
    if (learningId) {
      GetLearningByUserId(learningId);
    }
  }, [learningId]);

  function GetLearningByUserId(id) {
    axios
      .get(`${Domain}/api/Learning/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("✅ Learning Data Fetched:", res.data);
        setLearningData(res.data); // Store retrieved data in state
        setFormData(res.data); // Populate form with fetched data
      })
      .catch((err) => {
        console.error("❌ Error fetching learning data:", err);
        setErrorMessage("Failed to fetch learning data.");
      });
  }

  function sendLearning() {
    function formatDateToISO(dateString) {
      const date = new Date(`${dateString}-01T18:00:50.873Z`);
      return date.toISOString();
    }

    const formattedData = {
      ...formData,
      startDte: formatDateToISO(formData.startDte),
      endDte: formatDateToISO(formData.endDte),
    };

    axios
      .post(`${Domain}/api/Learning/Learning`, formattedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("✅ Success:", res.data);
        localStorage.setItem("learningId", res.data.id);
        setLearningId(res.data.userId); // Update state with new ID
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        setErrorMessage(err.response?.data?.message || err.message);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "grade" ? parseInt(value) || "" : value.trim(),
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    sendLearning();
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Education Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">School*</label>
          <input type="text" name="school" value={formData.school} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium">Degree</label>
          <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Start Date</label>
            <input type="month" name="startDte" value={formData.startDte} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">End Date</label>
            <input type="month" name="endDte" value={formData.endDte} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Grade</label>
          <input type="number" name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium">Activities and Societies</label>
          <input
            type="text"
            name="activities"
            value={formData.activities}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3"></textarea>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          onClick={() => { setTimeout(() => {
            navigate("/profile")
          }, 2000); } }
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
