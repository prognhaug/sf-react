import {
  CompanyDetails,
  InstanceCard,
  ConnectionCard,
  ConnectionForm,
  InstanceForm,
} from "../../features/";
import { CompanyContext } from "../../context/";
import { useContext, useState } from "react";
import { Solution } from "../../lib/";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { fetchApiData } from "../../utils/apiHandler";
import { useFetch } from "../../hooks/";
import { Instance, Connection } from "../../lib/";
import {
  useUpdateInstancesContext,
  useUpdateConnectionsContext,
} from "../../hooks/";

const instanceParamsObject = {
  fields: "solutionID",
  filter: '{ "active": "true" }',
};

const connectionParamsObject = {
  fields: "systemID",
};

const Setup = () => {
  const [showInstanceForm, setShowInstanceForm] = useState(false);
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);

  const { data: instances } = useFetch<Instance[]>(
    company ? `/api/instances/${company.companyID}` : "",
    instanceParamsObject,
    [company, triggerRefresh]
  );

  const { data: connections } = useFetch<Connection[]>(
    company ? `/api/connections/${company.companyID}` : "",
    connectionParamsObject,
    [company, triggerRefresh]
  );

  useUpdateInstancesContext(instances);
  useUpdateConnectionsContext(connections);

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
  const refresh = () => {
    setTriggerRefresh((prevState) => !prevState);
  };
  const fetchSolutions = async () => {
    try {
      const response = await fetchApiData<Solution[]>(
        "/api/solutions/all",
        { filter: '{ "active": "true" }' },
        authHeader
      );
      setSolutions(response);
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
                <InstanceCard instance={instance} triggerRefresh={refresh} />
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
                <ConnectionCard
                  connection={connection}
                  triggerRefresh={refresh}
                />
              </div>
            ))}
          </div>
        </div>
        {showConnectionForm && (
          <ConnectionForm
            onClose={handleCloseConnectionForm}
            triggerRefresh={refresh}
          />
        )}
        {showInstanceForm && (
          <InstanceForm
            onClose={handleCloseInstanceForm}
            triggerRefresh={refresh}
          />
        )}
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
