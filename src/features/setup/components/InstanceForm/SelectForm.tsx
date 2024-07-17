import { FormWrapper } from "./FormWrapper";
import React, { useEffect, useState } from "react";
import {
  formFieldsInstanceSolution,
  FieldConfig,
  System,
  Solution,
} from "../../../../lib";
import { InstanceFormData } from "./InstanceForm";
import { ConnectionContext } from "../../../../context/";
import { Dropdown } from "../../../../layouts";

type SolutionsFormProps = {
  updateFields: (fields: Partial<InstanceFormData>) => void;
  onSolutionChange: (value: string) => void;
  onConnectionChange: (connectionId: string, system: System) => void;
  solutions: Solution[];
};

export function SelectForm({
  updateFields,
  onSolutionChange,
  onConnectionChange,
  solutions,
}: SolutionsFormProps) {
  const [selectedSolution, setSelectedSolution] = useState<string>("");
  const [additionalFields, setAdditionalFields] = useState<FieldConfig[]>([]);
  const { connections } = React.useContext(ConnectionContext);

  useEffect(() => {
    if (selectedSolution) {
      const fields = formFieldsInstanceSolution[selectedSolution] || [];
      setAdditionalFields(fields);
    } else {
      setAdditionalFields([]);
    }
  }, [selectedSolution]);

  const handleSolutionFieldChange = (value: string) => {
    setSelectedSolution(value);
    onSolutionChange(value);
  };

  const isSystem = (systemID: System | unknown): systemID is System => {
    return (systemID as System).name !== undefined;
  };

  const handleConnectionChange = (value: string) => {
    const selectedConnectionId = value;
    const selectedConnection = connections?.find(
      (connection) => connection._id === selectedConnectionId
    );
    const system =
      selectedConnection && isSystem(selectedConnection.systemID)
        ? selectedConnection.systemID
        : null;
    onConnectionChange(selectedConnectionId, system as System);
  };

  // Function to filter connections based on the field's requirements
  const getFilteredConnections = (fieldName: string) => {
    return (
      connections?.filter((connection) => {
        const systemType =
          connection.systemID && isSystem(connection.systemID)
            ? connection.systemID.type
            : "";
        return fieldName === "connection_accounting"
          ? systemType === "accounting_system"
          : systemType === "payment_system";
      }) || []
    );
  };

  return (
    <FormWrapper title="Select Solution">
      <div className="text-center">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="solution"
        >
          Solution
        </label>
        <Dropdown
          choices={solutions.map((solution) => ({
            _id: solution._id,
            name: solution.name,
          }))}
          onSelect={(value) => handleSolutionFieldChange(value)}
          dropdownName="Solution"
        />
      </div>
      {additionalFields.map((field, index) =>
        field.type === "dropdown" ? (
          <React.Fragment key={index}>
            <label
              className="block text-white text-sm font-bold mb-2 pt-4"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <Dropdown
              choices={getFilteredConnections(field.name).map((connection) => ({
                _id: connection._id,
                name: connection.name,
              }))}
              onSelect={(value) => handleConnectionChange(value)}
              dropdownName="Connection"
            />
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <label
              className="block text-white text-sm font-bold mb-2 "
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              onChange={(e) => updateFields({ [field.name]: e.target.value })}
              required
              className="shadow  appearance-none backdrop-blur-lg bg-white/10 border rounded w-full py-2 px-3 text-white bg-gray-700 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
            />
          </React.Fragment>
        )
      )}
    </FormWrapper>
  );
}
