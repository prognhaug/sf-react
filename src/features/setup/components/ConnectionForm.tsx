import { useState, FormEvent, useEffect, useContext } from "react";
import { postApiData } from "../../../utils/apiHandler";
import { System, formFieldsConnection } from "../../../lib/";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CompanyContext } from "../../../context/";
import { Icon } from "../../../components/";
import ReactDOM from "react-dom";
import { useFetch } from "../../../hooks";
import { Dropdown } from "../../../layouts";

interface ConnectionFormProps {
  onClose: () => void;
  triggerRefresh: () => void;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({
  onClose,
  triggerRefresh,
}) => {
  // const [systems, setSystems] = useState<System[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<
    string | undefined
  >();
  // const [requestBody, setRequestBody] = useState<Record<string, string>>();
  // const { connections, setConnections } = useContext(ConnectionContext);
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);
  const [isConnectionAdded, setIsConnectionAdded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data: systems } = useFetch<System[]>("/api/systems/all");

  useEffect(() => {
    if (isConnectionAdded) {
      setShowSuccessModal(true);
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isConnectionAdded]);

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
    const postConnection = async () => {
      try {
        await postApiData(
          `/api/connections/${company?.companyID}/add`,
          requestBody,
          authHeader
        );
        triggerRefresh();
        onClose();
        setIsConnectionAdded(true);
        form.reset();
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
        className="relative w-full backdrop-blur-lg max-w-md p-4 bg-white/10 rounded-lg shadow-md mx-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close connection form"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
        <div className="mb-4 text-center">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="systemSelect"
          >
            System
          </label>
          <Dropdown
            choices={
              systems?.map((system) => ({
                _id: system._id,
                name: system.name,
              })) || []
            }
            onSelect={(value) => setSelectedSystemId(value)}
            dropdownName="System"
          />
        </div>
        <div>
          {selectedSystemId &&
            selectedSystemId in formFieldsConnection &&
            formFieldsConnection[selectedSystemId].map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="shadow backdrop-blur-lg bg-white/10 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
