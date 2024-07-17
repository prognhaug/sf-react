import Vipps from "../../../assets/Vipps";
import Tripletex from "../../../assets/Tripletex";
import { Connection, System } from "../../../lib/";
import Klarna from "../../../assets/klarna.png";

const ConnectionCard = (connection: Connection) => {
  const isSystem = (SystemID: System | string): SystemID is System => {
    return (SystemID as System).name !== undefined;
  };

  const systemName = isSystem(connection.systemID)
    ? connection.systemID.name
    : "";

  const renderSystemIcon = (systemName: string) => {
    console.log(systemName);
    switch (systemName) {
      case "Tripletex":
        return <Tripletex className="w-40 h-40" />;
      case "Klarna":
        return <img src={Klarna} className="w-40 h-40 object-contain" />;
      case "Vipps":
        return <Vipps className="w-40 h-40" />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderSystemIcon(systemName)}
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
