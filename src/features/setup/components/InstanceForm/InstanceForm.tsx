import ReactDOM from "react-dom";
import React, { useState, ReactElement, useContext } from "react";
import { SelectForm } from "./SelectForm";
import {
  formFieldsInstance,
  mapInstanceData,
  System,
  Instance,
} from "../../../../lib";
import GenericForm from "./GenericForm";
import { ConfigurationForm } from "./ConfigurationForm";
import { postApiData, putApiData } from "../../../../utils/apiHandler-copy";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CompanyContext, InstanceContext } from "../../../../context/";
import { Icon } from "../../../../components/";

interface InstanceFormProps {
  onClose: () => void;
  triggerRefresh: () => void;
}

type InstanceFormData = {
  name: string;
  selectedSolution: string;
  selectedConnections: string[];
  config: { [key: string]: string };
};

const initialState: InstanceFormData = {
  name: "",
  selectedSolution: "",
  selectedConnections: [],
  config: {},
};

const solutions = [
  {
    _id: "6665ae0ee7a1177ea26e3580",
    name: "SettleMatch",
    active: true,
    createdAt: "2024-06-09T13:28:46.441Z",
    updatedAt: "2024-06-09T13:28:46.441Z",
    __v: 0,
  },
  {
    _id: "668d36421740a10825396850",
    name: "CostOfGoods",
    active: true,
    createdAt: "2024-07-09T13:08:18.834Z",
    updatedAt: "2024-07-09T13:08:18.834Z",
    __v: 0,
  },
  {
    _id: "668d364a1740a10825396852",
    name: "ReVouch",
    active: true,
    createdAt: "2024-07-09T13:08:26.019Z",
    updatedAt: "2024-07-09T13:08:26.019Z",
    __v: 0,
  },
];

const InstanceForm: React.FC<InstanceFormProps> = ({
  onClose,
  triggerRefresh,
}) => {
  const { instances, setInstances } = useContext(InstanceContext);
  const [data, setData] = useState(initialState);
  const [connections, setConnections] = useState<
    { connectionId: string; system: System }[]
  >([]);
  const [steps, setSteps] = useState<ReactElement[]>([]);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const { company } = useContext(CompanyContext);
  const authHeader = useAuthHeader();

  const handleConfigChange = (formData: { [key: string]: string }) => {
    console.log("formData", formData);
    setData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        ...formData,
      },
    }));
  };

  function updateFields(fields: Partial<InstanceFormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const onSolutionChange = (solutionId: string) => {
    setData((prev) => ({ ...prev, selectedSolution: solutionId }));
  };

  const onConnectionChange = (connectionId: string, system: System) => {
    setConnections((prev) => [
      ...prev,
      { connectionId: connectionId, system: system },
    ]);
    setData((prev) => ({
      ...prev,
      selectedConnections: [...prev.selectedConnections, connectionId],
    }));
  };

  const getFormFieldsConfig = () => {
    const selectedSolutionConfig = formFieldsInstance[data.selectedSolution];

    if (!selectedSolutionConfig) return;

    Object.keys(selectedSolutionConfig).forEach((configType) => {
      const configOrFields = selectedSolutionConfig[configType];

      if (Array.isArray(configOrFields)) {
        console.log("configType", configType, "configOrFields", configOrFields);
        setSteps((prev) => [
          ...prev,
          <GenericForm
            formId={configType}
            fieldsConfig={configOrFields}
            handleConfigChange={handleConfigChange}
          />,
        ]);
      } else {
        connections.forEach((connection) => {
          const fields = configOrFields[connection.system._id];
          if (fields) {
            setSteps((prev) => [
              ...prev,
              <GenericForm
                formId={connection.system.type}
                fieldsConfig={fields}
                handleConfigChange={handleConfigChange}
              />,
            ]);
          }
        });
      }
    });
  };

  function generateSteps(e: React.FormEvent) {
    e.preventDefault();
    getFormFieldsConfig();
    setShowMoreContent(true);
  }

  async function save() {
    console.log(data);
    const dataToSend = mapInstanceData(data);
    try {
      const response: Instance | null = await postApiData(
        `/api/instances/${company?.companyID}/add`,
        { name: dataToSend.name, solutionID: dataToSend.solutionID },
        authHeader
      );
      await putApiData(
        `/api/instances/${company?.companyID}/${response?._id}/connections/add`,
        { connections: dataToSend.connections },
        authHeader
      );
      const updatedInstance: Instance | null = await postApiData(
        `/api/instances/${company?.companyID}/${response?._id}/config/add`,
        { ...dataToSend.config },
        authHeader
      );
      setInstances(
        updatedInstance ? [...(instances || []), updatedInstance] : instances
      );
      onClose();
      triggerRefresh();
    } catch (error) {
      console.error("Error saving instance:", error);
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md mx-auto">
        <button
          onClick={onClose}
          aria-label="Close instance form"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
        {showMoreContent ? (
          <ConfigurationForm
            forms={steps.map((form) =>
              React.cloneElement(form, { handleConfigChange })
            )}
            save={save}
          />
        ) : (
          <form>
            <SelectForm
              key="selectForm"
              updateFields={updateFields}
              onSolutionChange={onSolutionChange}
              onConnectionChange={onConnectionChange}
              solutions={solutions}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="submit"
                onClick={generateSteps}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default InstanceForm;
export type { InstanceFormData };
