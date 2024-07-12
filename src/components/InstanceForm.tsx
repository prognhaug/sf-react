import { useState, FormEvent, useContext } from "react";
import Icon from "./Icon";
import ReactDOM from "react-dom";
import { Solution, System } from "../models/types";
import {
  formFieldsInstanceSolution,
  matchingConfigFields,
  formFieldsInstanceSettleMatch,
  formFieldsInstanceCostOfGoods,
} from "../configs/formFieldsConfig-copy";
import { ConnectionContext } from "../context/ConnectionContext";

interface InstanceFormProps {
  onClose: () => void;
  solutions: Solution[];
}

const InstanceForm: React.FC<InstanceFormProps> = ({ onClose, solutions }) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<
    string | undefined
  >();
  const { connections } = useContext(ConnectionContext);
  const [selectedSystemId, setSelectedSystemId] = useState<string>("");
  const isSystem = (systemID: System | unknown): systemID is System => {
    return (systemID as System).name !== undefined;
  };

  const renderFormFields = () => {
    if (!selectedSolutionId) return null;

    let fields = formFieldsInstanceSolution[selectedSolutionId] || [];
    if (selectedSolutionId === "6665ae0ee7a1177ea26e3580") {
      const settleMatchFields =
        formFieldsInstanceSettleMatch[selectedSystemId] || [];
      fields = [...fields, ...settleMatchFields];
      console.log("fields", fields);
    } else if (selectedSolutionId === "6665adb5e7a1177ea26e3572") {
      const costOfGoodsFields =
        formFieldsInstanceCostOfGoods[selectedSolutionId] || [];
      fields = [...fields, ...costOfGoodsFields];
    }
    if (selectedSolutionId === "6665ae0ee7a1177ea26e3580") {
      fields = [...fields, ...matchingConfigFields];
    }
    return fields.map((field) => {
      if (field.type === "dropdown") {
        const filteredConnections = connections?.filter((connection) => {
          const systemType =
            connection.systemID && isSystem(connection.systemID)
              ? connection.systemID.type
              : "";

          return field.name === "connection_accounting"
            ? systemType === "accounting_system"
            : systemType === "payment_system";
        });

        return (
          <div key={field.name} className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              className="shadow border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
              defaultValue={""}
              onChange={(e) => {
                const selectedConnection = connections?.find(
                  (connection) => connection._id === e.target.value
                );
                if (
                  selectedConnection &&
                  isSystem(selectedConnection.systemID)
                ) {
                  setSelectedSystemId(selectedConnection.systemID._id);
                }
              }}
            >
              {
                <option value="" disabled>
                  Choose connection
                </option>
              }
              {filteredConnections?.map((connection) => (
                <option key={connection._id} value={connection._id}>
                  {connection.name}
                </option>
              ))}
            </select>
          </div>
        );
      }

      return (
        <div key={field.name} className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor={field.name}
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            className="shadow border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
      );
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          onClose();
        }}
        className="relative w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md mx-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close instance form"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="solutionSelect"
        >
          Select Solution
        </label>
        <select
          id="solutionSelect"
          className="shadow border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
          value={selectedSolutionId}
          onChange={(e) => setSelectedSolutionId(e.target.value)}
        >
          <option value="" disabled selected>
            Select Solution
          </option>
          {solutions.map((solution) => (
            <option key={solution._id} value={solution._id}>
              {solution.name}
            </option>
          ))}
        </select>
        {renderFormFields()}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default InstanceForm;
