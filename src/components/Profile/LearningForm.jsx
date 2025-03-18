import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLearning } from "../../apicalls/profile";
export default function LearningForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startDte, setStartDte] = useState("");
  const [endDte, setEndDte] = useState("");
  const [grade, setGrade] = useState(0);
  const [activities, setActivities] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    sendLearning(school,degree,startDte,endDte,grade,activities,description,about,setErrorMessage);
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Education Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">School*</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDte}
              onChange={(e) => setStartDte(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDte}
              onChange={(e) => setEndDte(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Grade</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Activities and Societies</label>
          <input
            type="text"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          onClick={() => {
            (!(errorMessage.length>0))&&setTimeout(() => {
              navigate("/profile");
            }, 2000);
          }}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
