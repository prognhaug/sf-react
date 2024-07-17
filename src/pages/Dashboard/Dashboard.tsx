import React from "react";
import { TaskTable } from "../../features/";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center w-full px-5">
        <h1 className="text-3xl font-bold dark:text-white mb-4 mt-4">
          Dashboard
        </h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500 w-full" />
      </div>
      <div className="flex-1 ">
        <TaskTable />
      </div>
    </div>
  );
};

export default Dashboard;
