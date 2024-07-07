import { Instance, Solution } from "../models/types";

const InstanceCard: React.FC<{ instance: Instance }> = ({ instance }) => {
  const isSolution = (
    solutionID: Solution | unknown
  ): solutionID is Solution => {
    return (solutionID as Solution).name !== undefined;
  };
  const solutionName =
    instance.solutionID && isSolution(instance.solutionID)
      ? instance.solutionID.name
      : "";
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="bg-white dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Solution</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {solutionName}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Name</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {instance.name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InstanceCard;
