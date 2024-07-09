import NavBar from "../../components/NavBar";
import CompanyDetails from "../../components/CompanyDetails";
import InstanceCard from "../../components/InstanceCard";
import ConnectionCard from "../../components/ConnectionCard";
import { CompanyContext } from "../../context/CompanyContext";
import { useContext, useState } from "react";
import { InstanceContext } from "../../context/InstanceContext";
import { ConnectionContext } from "../../context/ConnectionContext";
import InstanceForm from "../../components/InstanceForm";
import ConnectionForm from "../../components/ConnectionForm";

const Setup = () => {
  const [showInstanceForm, setShowInstanceForm] = useState(false);
  const [showConnectionForm, setShowConnectionForm] = useState(false);

  const toggleInstanceForm = () => {
    setShowInstanceForm(true);
    setShowConnectionForm(false);
  };

  const toggleConnectionForm = () => {
    setShowConnectionForm(true);
    setShowInstanceForm(false);
  };

  const handleCloseConnectionForm = () => {
    setShowConnectionForm(false);
  };

  const handleCloseInstanceForm = () => {
    setShowInstanceForm(false);
  };
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
              <h2 className="text-white mb-2">
                Instances <button onClick={toggleInstanceForm}>+</button>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instances.map((instance, index) => (
                  <div key={index}>
                    <InstanceCard instance={instance} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {connections && connections.length > 0 && (
            <div>
              <h2 className="text-white mb-2">
                Connections <button onClick={toggleConnectionForm}>+</button>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection, index) => (
                  <div key={index}>
                    <ConnectionCard connection={connection} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {showConnectionForm && (
            <ConnectionForm onClose={handleCloseConnectionForm} />
          )}
          {showInstanceForm && (
            <InstanceForm onClose={handleCloseInstanceForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Setup;
