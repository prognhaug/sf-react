import NavBar from "../../components/NavBar";
import CompanyDetails from "../../components/CompanyDetails";
import InstanceCard from "../../components/InstanceCard";
import ConnectionCard from "../../components/ConnectionCard";
import { CompanyContext } from "../../context/CompanyContext";
import { useContext } from "react";
import { InstanceContext } from "../../context/InstanceContext";
import { ConnectionContext } from "../../context/ConnectionContext";

const Setup = () => {
  const { company } = useContext(CompanyContext);
  const { instances } = useContext(InstanceContext);
  const { connections } = useContext(ConnectionContext);

  return (
    <div className="flex min-h-screen bg-gray-700">
      <div className="w-64">
        <NavBar />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-white mt-4 mb-2">Setup Page</h1>
        <div className="w-full p-4">
          {company && (
            <div>
              <h2 className="text-white mb-2">Company Details</h2>
              <CompanyDetails company={company} />
            </div>
          )}
          {instances && instances.length > 0 && (
            <div>
              <h2 className="text-white mb-2">Instances</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instances.map((instance, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-2 rounded-lg shadow-md"
                  >
                    <InstanceCard instance={instance} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {connections && connections.length > 0 && (
            <div>
              <h2 className="text-white mb-2">connections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-2 rounded-lg shadow-md"
                  >
                    <ConnectionCard connection={connection} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
