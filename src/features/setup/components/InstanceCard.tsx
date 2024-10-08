import { Instance, Solution, Connection } from "../../../lib/";

interface InstanceCardProps {
  instance: Instance;
  connections: Connection[];
}

const InstanceCard: React.FC<InstanceCardProps> = ({
  instance,
  connections,
}) => {
  const isSolution = (
    solutionID: Solution | unknown
  ): solutionID is Solution => {
    return (solutionID as Solution).name !== undefined;
  };

  // Check if instance.solutionID is not undefined before proceeding
  const solutionName =
    instance.solutionID && isSolution(instance.solutionID)
      ? instance.solutionID.name
      : "";

  const instanceConnections = instance.connections
    ? connections.filter((conn) =>
        instance.connections?.includes(conn._id as string)
      )
    : [];

  return (
    <>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {solutionName}
      </h5>

      <div className="flex justify-between px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        {instanceConnections.map((connection) => (
          <span
            key={connection._id}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {connection.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default InstanceCard;
