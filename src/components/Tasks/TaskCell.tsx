import React from "react";

type TaskCellProps = {
  children: React.ReactNode;
};

const TaskCell: React.FC<TaskCellProps> = ({ children }) => (
  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    {children}
  </td>
);

export default TaskCell;
