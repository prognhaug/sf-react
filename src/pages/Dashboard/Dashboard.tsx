import React from "react";
import TaskTable from "../../components/Tasks/TaskTable";

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-700">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-center bg-gray-800 py-4">
          <h1 className="text-white">Dashboard</h1>
        </div>
        <div className="flex-1">
          <TaskTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
