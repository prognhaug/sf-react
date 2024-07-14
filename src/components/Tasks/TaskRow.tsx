import React, { useState } from "react";
import { ExtendedTask } from "../../models/types";
import TaskCell from "./TaskCell";
import TaskActionCell from "./TaskActionCell";
import Icon from "../Icon";
import ToggleButton from "../ToggleButton";
import { postApiData } from "../../utils/apiHandler";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const TaskRow: React.FC<{ task: ExtendedTask }> = ({ task }) => {
  const authHeader = useAuthHeader();
  const [isActive, setIsActive] = useState(task.active);
  const [isLoading, setIsLoading] = useState(false);
  const dateString = (date: string | null | undefined) =>
    date ? new Date(date).toLocaleString() : "N/A";
  const handleToggle = async (newState: boolean) => {
    setIsLoading(true);
    setIsActive(newState);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      if (newState) {
        (await postApiData(`/api/tasks/activate/${task._id}`, {}, authHeader))
          ? null
          : setIsActive(!newState);
      } else {
        (await postApiData(`/api/tasks/deactivate/${task._id}`, {}, authHeader))
          ? null
          : setIsActive(!newState);
      }
    } catch (error) {
      console.error("API call failed:", error);
      setIsActive(!newState);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <TaskCell>{task.companyInfo?.name}</TaskCell>
      <TaskCell>{task.name}</TaskCell>
      <TaskCell>{dateString(task.lastRunDate)}</TaskCell>
      <TaskCell>
        {task.lastRunSuccess ? (
          <Icon name="success" className="text-green-500"></Icon>
        ) : (
          <Icon name="fail" className="text-red-500"></Icon>
        )}
      </TaskCell>
      <TaskCell>{dateString(task.nextRunDate)}</TaskCell>
      <TaskCell>
        <ToggleButton
          isActive={isActive}
          onToggle={handleToggle}
          disabled={isLoading}
        />
      </TaskCell>
      <TaskActionCell isActive={isActive} task={task} />
    </tr>
  );
};

export default TaskRow;
