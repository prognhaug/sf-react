import {
  InstanceCard,
  ConnectionCard,
  ConnectionForm,
  InstanceForm,
  EntityCard,
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
// import { EntityCard } from "../../layouts/";

const instanceParamsObject = {
  fields: "solutionID",
  filter: '{ "deleted": "false" }',
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
    <div className="flex-1 flex flex-col items-center w-full px-5">
      <h1 className="text-3xl font-bold dark:text-white mb-4 mt-4">Setup</h1>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500 w-full" />
      <div className="w-full px-2">
        {company && (
          <div>
            <h2 className="text-3xl font-bold dark:text-white mb-4 justify-center flex">
              {company.name}
            </h2>

            <h2 className="text-3xl font-bold dark:text-white mb-2 justify-center flex pt-4">
              Instances
            </h2>
            <div className="flex justify-center pb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                onClick={() =>
                  solutions.length > 0 ? handleClick(false) : handleClick(true)
                }
              >
                Add instance
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {instances?.map((instance, index) => (
                <div key={index}>
                  <EntityCard
                    entity={instance}
                    triggerRefresh={refresh}
                    apiEndpoint="/api/instances"
                    customUI={
                      <InstanceCard
                        instance={instance}
                        connections={connections || []}
                      />
                    }
                  />
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold dark:text-white mb-2 justify-center flex pt-4">
              Connections{" "}
            </h2>
            <div className="flex justify-center pb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                onClick={toggleConnectionForm}
              >
                Add connection
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections?.map((connection, index) => (
                <div key={index}>
                  <EntityCard
                    entity={connection}
                    triggerRefresh={refresh}
                    apiEndpoint="/api/connections"
                    customUI={ConnectionCard(connection)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
