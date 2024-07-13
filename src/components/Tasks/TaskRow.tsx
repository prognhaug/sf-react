import React from "react";
import { ExtendedTask } from "../../models/types";
import TaskCell from "./TaskCell";

const TaskRow: React.FC<{ task: ExtendedTask }> = ({ task }) => {
  const dateString = (date: string | null | undefined) =>
    date ? new Date(date).toLocaleString() : "N/A";
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <TaskCell>{task.companyInfo?.name}</TaskCell>
      <TaskCell>{task.name}</TaskCell>
      <TaskCell>{dateString(task.lastRunDate)}</TaskCell>
      <TaskCell>{task.lastRunSuccess ? "Success" : "Failed"}</TaskCell>
      <TaskCell>{dateString(task.nextRunDate)}</TaskCell>
      <TaskCell>{task.active ? "Active" : "Inactive"}</TaskCell>
    </tr>
  );
};

export default TaskRow;
