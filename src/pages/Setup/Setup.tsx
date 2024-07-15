import {
  CompanyDetails,
  InstanceCard,
  ConnectionCard,
  ConnectionForm,
  InstanceForm,
} from "../../features/";
import {
  CompanyContext,
  InstanceContext,
  ConnectionContext,
} from "../../context/";
import { useContext, useState } from "react";
import { Solution } from "../../lib/";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { fetchApiData } from "../../utils/apiHandler-copy";

const Setup = () => {
  const [showInstanceForm, setShowInstanceForm] = useState(false);
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const authHeader = useAuthHeader();

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
  const handleClick = (fetchData: boolean) => {
    toggleInstanceForm();
    if (fetchData) {
      fetchSolutions();
    }
  };
  const { company } = useContext(CompanyContext);
  const { instances } = useContext(InstanceContext);
  const { connections } = useContext(ConnectionContext);
  const fetchSolutions = async () => {
    try {
      const response = await fetchApiData<Solution[]>(
        "/api/solutions/all",
        { filter: '{ "active": "true" }' },
        authHeader
      );
      if (response !== null) {
        setSolutions(response);
      } else {
        console.error("Failed to fetch solutions or unauthorized");
      }
    } catch (error) {
      console.error("Failed to fetch solutions:", error);
    }
  };
  return (
    <div className="flex-1 flex flex-col items-center">
      <h1 className="text-white mt-4 mb-2">Setup Page</h1>
      <div className="w-full p-4">
        {company && (
          <div>
            <h2 className="text-white mb-2">Company Details</h2>
            <CompanyDetails company={company} />
          </div>
        )}
        <div>
          <h2 className="text-white mb-2">
            Instances{" "}
            <button
              onClick={() =>
                solutions.length > 0 ? handleClick(false) : handleClick(true)
              }
            >
              +
            </button>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instances?.map((instance, index) => (
              <div key={index}>
                <InstanceCard instance={instance} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-white mb-2">
            Connections <button onClick={toggleConnectionForm}>+</button>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections?.map((connection, index) => (
              <div key={index}>
                <ConnectionCard connection={connection} />
              </div>
            ))}
          </div>
        </div>
        {showConnectionForm && (
          <ConnectionForm onClose={handleCloseConnectionForm} />
        )}
        {showInstanceForm && <InstanceForm onClose={handleCloseInstanceForm} />}
        {/* {showInstanceForm && (
            <InstanceForm
              onClose={handleCloseInstanceForm}
              solutions={solutions}
            />
          )} */}
      </div>
    </div>
  );
};

export default Setup;
