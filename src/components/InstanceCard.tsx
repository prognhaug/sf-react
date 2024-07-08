import { Instance, Solution } from "../models/types";
import { ConnectionContext } from "../context/ConnectionContext";
import { useContext } from "react";

const InstanceCard: React.FC<{ instance: Instance }> = ({ instance }) => {
  const { connections } = useContext(ConnectionContext);
  const isSolution = (
    solutionID: Solution | unknown
  ): solutionID is Solution => {
    return (solutionID as Solution).name !== undefined;
  };
  const solutionName =
    instance.solutionID && isSolution(instance.solutionID)
      ? instance.solutionID.name
      : "";
  const instanceConnections = instance.connections
    ? connections?.filter((conn) =>
        instance.connections.includes(conn._id as string)
      )
    : [];
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
            <td className="px-6 py-4">Status</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {instance.active ? "Active" : "Inactive"}
            </td>
          </tr>
          {instanceConnections?.map((connection) => (
            <tr
              key={connection._id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">Connection</td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {connection.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstanceCard;
