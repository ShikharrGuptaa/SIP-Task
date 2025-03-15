import React, { useState } from "react";
import { getInstalmentDate } from "../services/api";

const InstalmentDate = () => {
  const [startDate, setStartDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [transactionDate, setTransactionDate] = useState(""); // Fixed
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await getInstalmentDate({
        startDate,
        frequency,
        transactionDate, // Fixed
      });
      setDate(response.data.original_instalment_date);
    } catch (err) {
      setError("Failed to fetch instalment date.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Instalment Date</h2> {/* Fixed heading */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Frequency</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Transaction Date:</label> {/* Fixed label */}
          <input
            type="date"
            value={transactionDate} // Fixed state
            onChange={(e) => setTransactionDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Get Instalment Date
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {date && <p className="mt-4 text-green-500">Instalment Date: {date}</p>} {/* Fixed text */}
    </div>
  );
};

export default InstalmentDate;
