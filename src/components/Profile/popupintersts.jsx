import React from "react";

const PopupModal = ({
  isOpen,
  onClose,
  academicSubjects,
  extracurricularActivities,
  selectedInterests,
  handleCheckboxChange,
  customAcademicInterest,
  setCustomAcademicInterest,
  customExtracurricularInterest,
  setCustomExtracurricularInterest,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg w-full bg-white p-4 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-2">Area(s) of Interest:</h2>

        {/* Academic Subjects */}
        <div className="mb-4">
          <p className="font-medium">Academic Subjects:</p>
          <div className="space-y-2 mt-2">
            {academicSubjects.map((subject, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={selectedInterests.includes(subject)}
                  onChange={() => handleCheckboxChange(subject)}
                />
                <span>{subject}</span>
              </label>
            ))}

            {/* Other Option with Text Input */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={customAcademicInterest.length > 0}
                onChange={() => setCustomAcademicInterest(customAcademicInterest ? "" : " ")}
              />
              <span>Other</span>
            </label>

            {customAcademicInterest.length > 0 && (
              <input
                type="text"
                value={customAcademicInterest}
                onChange={(e) => setCustomAcademicInterest(e.target.value)}
                placeholder="Please type another option here"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            )}
          </div>
        </div>

        {/* Extracurricular Activities */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-medium">Extracurricular Activities:</p>
          <div className="space-y-2 mt-2">
            {extracurricularActivities.map((activity, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  checked={selectedInterests.includes(activity)}
                  onChange={() => handleCheckboxChange(activity)}
                />
                <span>{activity}</span>
              </label>
            ))}

            {/* Other Option with Text Input */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={customExtracurricularInterest.length > 0}
                onChange={() => setCustomExtracurricularInterest(customExtracurricularInterest ? "" : " ")}
              />
              <span>Other</span>
            </label>

            {customExtracurricularInterest.length > 0 && (
              <input
                type="text"
                value={customExtracurricularInterest}
                onChange={(e) => setCustomExtracurricularInterest(e.target.value)}
                placeholder="Please type another option here"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            if (customAcademicInterest.trim()) {
              handleCheckboxChange(customAcademicInterest.trim());
              setCustomAcademicInterest("");
            }
            if (customExtracurricularInterest.trim()) {
              handleCheckboxChange(customExtracurricularInterest.trim());
              setCustomExtracurricularInterest("");
            }
            onClose();
          }}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
