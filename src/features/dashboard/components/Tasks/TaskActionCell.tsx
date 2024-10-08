import Icon from "../../../../components/ui/Icon";
import { ExtendedTask } from "../../../../lib";
import { postApiData } from "../../../../utils/apiHandler";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useState } from "react";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import { Link } from "react-router-dom";

interface TaskActionCellProps {
  isActive: boolean;
  task: ExtendedTask;
}

const TaskActionCell = ({ isActive, task }: TaskActionCellProps) => {
  const authHeader = useAuthHeader();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await postApiData(
        `/api/tasks/run/`,
        {
          instanceID: task.instanceID,
          companyID: task.companyID,
          debugMode: false,
        },
        authHeader
      );
    } catch (error) {
      console.error("API call failed:", error);
    }
    setIsLoading(false);
  };
  return (
    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex justify-between">
      <button className="text-amber-600 hover:text-amber-300">
        <Icon name="pencilSquare"></Icon>
      </button>
      <button
        className={`${
          isLoading
            ? "text-green-600"
            : isActive
            ? "text-green-600 hover:text-green-300"
            : "text-green-900"
        }`}
        onClick={handleStart}
        disabled={!isActive || isLoading}
      >
        {isLoading ? <LoadingSpinner /> : <Icon name="play"></Icon>}
      </button>
      <button className="text-blue-600 hover:text-blue-300">
        <Link to={`/history/${task.companyID}/${task.instanceID}`} state={task}>
          <Icon name="book"></Icon>
        </Link>
      </button>
    </td>
  );
};

export default TaskActionCell;
