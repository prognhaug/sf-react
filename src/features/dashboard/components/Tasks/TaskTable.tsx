import { useContext } from "react";
import TaskRow from "./TaskRow";
import { Task, ExtendedTask, Company } from "../../../../lib";
import { CompaniesContext } from "../../../../context/CompaniesContext";
import useFetch from "../../../../hooks/useFetch";
import TaskHeader from "./TaskHeader";

const TaskTable = () => {
  const { companies } = useContext(CompaniesContext);

  const { data: tasks, loading, error } = useFetch<Task[]>("/api/tasks/");

  const mergeTasksWithCompanies = (tasks: Task[], companies: Company[]) => {
    return tasks.map((task) => {
      const companyInfo = companies.find(
        (company) => company.companyID === task.data.companyID
      );
      return { ...task, companyInfo };
    });
  };

  const extendedTasks: ExtendedTask[] = tasks
    ? mergeTasksWithCompanies(tasks, companies || [])
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative overflow-x-auto p-3 sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-white">
            <TaskHeader>Company Name</TaskHeader>
            <TaskHeader>Instance Name</TaskHeader>
            <TaskHeader>Last Run Date</TaskHeader>
            <TaskHeader>Last Run Status</TaskHeader>
            <TaskHeader>Next Run Date</TaskHeader>
            <TaskHeader>Active</TaskHeader>
            <TaskHeader>Actions</TaskHeader>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {extendedTasks.map((extendedTask, index) => (
            <TaskRow key={index} task={extendedTask} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
