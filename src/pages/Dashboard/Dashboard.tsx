import React from "react";
import { TaskTable } from "../../features/";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-center py-4">
        <h1 className="text-3xl font-bold dark:text-white mb-4 mt-4">
          Dashboard
        </h1>
      </div>
      <div className="flex-1 ">
        <TaskTable />
      </div>
    </div>
  );
};

export default Dashboard;
