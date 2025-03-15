import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">SIP Management</h1>
      <div className="space-y-8">
        <Link
          to="/next-sip-date"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Get Next SIP Date
        </Link>
        <Link
          to="/instalment-date"
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Get Instalment Date
        </Link>
        <Link
          to="/add-holiday"
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-700"
        >
          Add Holiday
        </Link>
      </div>
    </div>
  );
};

export default Home;
