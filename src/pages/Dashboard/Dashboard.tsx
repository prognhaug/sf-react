import React from "react";
import NavBar from "../../components/NavBar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-700">
      <NavBar />
      <h1 className="text-white mt-4 mb-2">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
