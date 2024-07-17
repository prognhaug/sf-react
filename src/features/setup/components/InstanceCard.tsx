import { Instance, Solution } from "../../../lib/";
import { useContext } from "react";
import { ConnectionContext } from "../../../context/";

const InstanceCard = (instance: Instance) => {
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
        instance.connections?.includes(conn._id as string)
      )
    : [];

  return (
    <>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {solutionName}
      </h5>

      <tr>
        {instanceConnections?.map((connection) => (
          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {connection.name}
            </span>
          </td>
        ))}
      </tr>
    </>
  );
};

export default InstanceCard;
