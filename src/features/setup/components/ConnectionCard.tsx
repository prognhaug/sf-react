import Vipps from "../../../assets/Vipps";
import Tripletex from "../../../assets/Tripletex";
import { Connection, System } from "../../../lib/";

const ConnectionCard = (connection: Connection) => {
  const isSystem = (SystemID: System | string): SystemID is System => {
    return (SystemID as System).name !== undefined;
  };

  const systemName = isSystem(connection.systemID)
    ? connection.systemID.name
    : "";

  return (
    <>
      {systemName === "Tripletex" ? (
        <Tripletex className="w-40 h-40" />
      ) : (
        <Vipps className="w-40 h-40" />
      )}
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {connection.name}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {systemName}
      </span>
    </>
  );
};

export default ConnectionCard;
