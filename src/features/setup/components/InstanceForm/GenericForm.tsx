import React, { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { FieldConfig } from "../../../../lib";

interface GenericFormProps {
  formId: string;
  fieldsConfig: FieldConfig[];
  handleConfigChange: (configuration: { [key: string]: string }) => void;
}

// Step 2: Create the generic form component
const GenericForm: React.FC<GenericFormProps> = ({
  fieldsConfig,
  handleConfigChange,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updatedConfig = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedConfig);
    handleConfigChange(updatedConfig); // Pass the updated config directly to the parent
  };

  return (
    <FormWrapper title={`Input data`}>
      {fieldsConfig.map((field) => (
        <div key={field.name} className="flex flex-col mb-4">
          <label
            htmlFor={field.name}
            className="block text-white text-sm font-bold mb-2 "
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white backdrop-blur-lg bg-white/10 border-gray-600 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
      ))}
    </FormWrapper>
  );
};

export default GenericForm;
