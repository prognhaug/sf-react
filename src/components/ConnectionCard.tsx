import { Connection, System } from "../models/types";

const ConnectionCard: React.FC<{ connection: Connection }> = ({
  connection,
}) => {
  const isSystem = (SystemID: System | unknown): SystemID is System => {
    return (SystemID as System).name !== undefined;
  };
  const SystemName =
    connection.systemID && isSystem(connection.systemID)
      ? connection.systemID.name
      : "";
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="bg-white dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Status</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {connection.active ? "Active" : "Inactive"}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Name</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {connection.name}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">System</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {SystemName}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConnectionCard;
