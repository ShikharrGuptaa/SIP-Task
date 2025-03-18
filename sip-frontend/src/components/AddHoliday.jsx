import React, { useState } from "react";
import { addHoliday } from "../services/api";

const AddHoliday = () => {
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddHoliday = () => {
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays([...holidays, newHoliday]);
      setNewHoliday("");
    }
  };

  const handleRemoveHoliday = (date) => {
    setHolidays(holidays.filter((holiday) => holiday !== date));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (holidays.length === 0) {
      setError("Please add at least one holiday.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addHoliday({ holidays });
      setSuccess("Holidays added successfully!");
      setHolidays([]); // Clear after successful submission
    } catch (err) {
      setError("Failed to add holidays.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Add Holidays</h2>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-96">
        <div>
          <label className="block text-gray-700">Select Holiday Date:</label>
          <input
            type="date"
            value={newHoliday}
            onChange={(e) => setNewHoliday(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddHoliday}
            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Add Date
          </button>
        </div>

        {holidays.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Added Holidays:</h3>
            <ul className="mt-2 space-y-1">
              {holidays.map((date, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-200 p-2 rounded-lg"
                >
                  {date}
                  <button
                    onClick={() => handleRemoveHoliday(date)}
                    className="text-red-500 font-bold"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Submit Holidays
        </button>

        {loading && <p className="mt-2 text-gray-600">Submitting...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default AddHoliday;
