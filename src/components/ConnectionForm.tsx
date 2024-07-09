import { useState, FormEvent, useEffect, useContext } from "react";
import { fetchApiData, postApiData } from "../utils/apiHandler";
import { System, Connection } from "../models/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import formFieldsConfig from "../configs/formFieldsConfig";
import { CompanyContext } from "../context/CompanyContext";
import { ConnectionContext } from "../context/ConnectionContext";
import Icon from "./Icon";
import ReactDOM from "react-dom";

interface ConnectionFormProps {
  onClose: () => void;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({ onClose }) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<
    string | undefined
  >();
  const { setConnections } = useContext(ConnectionContext);
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);
  const [isConnectionAdded, setIsConnectionAdded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (isConnectionAdded) {
      setShowSuccessModal(true);
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isConnectionAdded]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetchApiData<System[]>(
          "/api/systems/all",
          {},
          authHeader
        );
        if (response !== null) {
          setSystems(response);
        } else {
          console.error("Failed to fetch companies or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchSystems();
  }, [authHeader]);

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsConnectionAdded(false);
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    const requestBody = {
      ...formValues,
      systemID: selectedSystemId,
    };
    const fetchConnections = async () => {
      try {
        const response = await fetchApiData<Connection[] | null>(
          `/api/connections/${company?.companyID}`,
          { fields: "systemID" },
          authHeader
        );
        console.log(response);
        if (response === null) {
          setConnections([]);
          return;
        } else if (response !== null) {
          setConnections(response);
        } else {
          console.error("Failed to fetch connections or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    const postConnection = async () => {
      try {
        console.log(requestBody);
        const response = await postApiData(
          `/api/connections/${company?.companyID}/add`,

          requestBody,
          authHeader
        );
        if (response !== null) {
          console.log("Connection added successfully");
          fetchConnections();
          onClose();
          setIsConnectionAdded(true);
          form.reset();
        } else {
          console.error("Failed to add connection");
        }
      } catch (error) {
        console.error("Failed to add connection:", error);
      }
    };
    postConnection();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md mx-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close connection form"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="systemSelect"
          >
            Select System
          </label>
          <select
            id="systemSelect"
            className="shadow border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
            value={selectedSystemId}
            onChange={(e) => setSelectedSystemId(e.target.value)}
          >
            <option value="" disabled selected>
              Select System
            </option>
            {systems.map((system) => (
              <option key={system._id} value={system._id}>
                {system.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {selectedSystemId &&
            selectedSystemId in formFieldsConfig &&
            formFieldsConfig[selectedSystemId].map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
          >
            Cancel
          </button>
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white text-center py-4 font-bold text-lg z-50">
          Connection Added!
        </div>
      )}
    </div>,
    document.body
  );
};

export default ConnectionForm;
