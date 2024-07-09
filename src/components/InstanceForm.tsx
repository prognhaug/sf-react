import { useState, FormEvent } from "react";
import Icon from "./Icon";

interface InstanceFormProps {
  onClose: () => void;
}

const InstanceForm: React.FC<InstanceFormProps> = ({ onClose }) => {
  const [instanceName, setInstanceName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted", { instanceName });
  };

  return (
    <div className="flex bg-gray-700 pt-8 items-center justify-center">
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <button onClick={onClose} aria-label="Delete connection">
            <Icon name="xcircle" className="text-white" />
          </button>
          <div>
            <label htmlFor="instanceName" className="text-white">
              Instance Name
            </label>
            <input
              id="instanceName"
              type="text"
              value={instanceName}
              onChange={(e) => setInstanceName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstanceForm;
