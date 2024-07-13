import React from "react";
import { ExtendedTask } from "../../models/types";

const TaskRow: React.FC<{ task: ExtendedTask }> = ({ task }) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        {task.companyInfo?.name}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        {task.name}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        {task.active ? "Active" : "Inactive"}
      </td>
    </tr>
  );
};

export default TaskRow;
