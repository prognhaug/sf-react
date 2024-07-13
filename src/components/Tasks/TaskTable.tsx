import { useEffect, useState, useContext } from "react";
import TaskRow from "./TaskRow";
import { Task, ExtendedTask, Company } from "../../models/types";
// import { useApiHandler } from "../../utils/useApiHandler";
import { fetchApiData } from "../../utils/apiHandler-copy";
import { CompaniesContext } from "../../context/CompaniesContext";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const TaskTable = () => {
  // const { get } = useApiHandler();
  const authHeader = useAuthHeader();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { companies } = useContext(CompaniesContext);

  useEffect(() => {
    async function fetchTasks(): Promise<void> {
      try {
        const fetchedTasks = await fetchApiData<Task[]>(
          "/api/tasks/",
          {},
          authHeader
        );
        if (fetchedTasks) {
          setTasks(fetchedTasks);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
    fetchTasks();
  }, [authHeader]);

  const mergeTasksWithCompanies = (tasks: Task[], companies: Company[]) => {
    return tasks.map((task) => {
      const companyInfo = companies.find(
        (company) => company.companyID === task.data.companyID
      );
      return { ...task, companyInfo };
    });
  };

  const extendedTasks: ExtendedTask[] = mergeTasksWithCompanies(
    tasks,
    companies || []
  );

  return (
    <div className="relative overflow-hidden p-3">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800">
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-white">
              <th scope="col" className="px-6 py-4">
                Company Name
              </th>
              <th scope="col" className="px-6 py-4">
                Instance Name
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {extendedTasks.map((extendedTask, index) => (
              <TaskRow key={index} task={extendedTask} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
