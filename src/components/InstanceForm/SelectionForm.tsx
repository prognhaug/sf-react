import React, { useState, useContext } from "react";
import { Solution, System } from "../../models/types";
import { ConnectionContext } from "../../context/ConnectionContext";
import { formFieldsInstanceSolution } from "../../configs/formFieldsConfig";

interface SelectionFormProps {
  onSelection: (selection: {
    solutionId: string;
    connections: string[];
  }) => void;
  onClose: () => void;
  solutions: Solution[];
}

const SelectionForm: React.FC<SelectionFormProps> = ({
  onSelection,
  onClose,
  solutions,
}) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<
    string | undefined
  >();
  const { connections } = useContext(ConnectionContext);
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>([]);
  const isSystem = (systemID: System | unknown): systemID is System => {
    return (systemID as System).name !== undefined;
  };

  const handleSelection = () => {
    const selectedConnections =
      connections
        ?.filter(
          (connection) => connection.systemID && isSystem(connection.systemID)
        )
        .map((connection) => connection._id) || [];
    onSelection({
      solutionId: selectedSolutionId || "",
      connections: selectedConnections,
    });
  };

  const handleSystemSelection = (systemId: string) => {
    setSelectedSystemIds((prevSelectedSystemIds) => {
      if (prevSelectedSystemIds.includes(systemId)) {
        return prevSelectedSystemIds.filter((id) => id !== systemId);
      } else {
        return [...prevSelectedSystemIds, systemId];
      }
    });
  };

  const renderFormFields = () => {
    if (!selectedSolutionId) return null;

    const fields = formFieldsInstanceSolution[selectedSolutionId] || [];
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
                  handleSystemSelection(selectedConnection.systemID._id);
                }
              }}
            >
              <option value="" disabled>
                Choose connection
              </option>
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSelection();
        onClose();
      }}
      className="relative w-full max-w-md p-4 bg-gray-800 mx-auto"
    >
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
    </form>
  );
};

export default SelectionForm;
