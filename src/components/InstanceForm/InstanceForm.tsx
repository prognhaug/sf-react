import { useState } from "react";
import SelectionForm from "./SelectionForm";
import SystemConfigForm from "./SystemConfigForm";
import MatchingConfigForm from "./MatchingConfigForm";
import { Solution } from "../../models/types";
import ReactDOM from "react-dom";
import Icon from "../Icon";

interface FormData {
  solutionId: string;
  connections: string[];
  systemConfigs: { [key: string]: object };
  matchingConfig: object;
}

interface InstanceFormProps {
  onClose: () => void;
  solutions: Solution[];
}

const InstanceForm: React.FC<InstanceFormProps> = ({ onClose, solutions }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    solutionId: "",
    connections: [],
    systemConfigs: {},
    matchingConfig: {},
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSelection = (selection: {
    solutionId: string;
    connections: string[];
  }) => {
    // Initialize systemConfigs based on the selected solution
    console.log("formData");
    const systemConfigsInit = selection.connections.reduce<
      Record<string, object>
    >((acc, curr) => {
      acc[curr] = {};
      return acc;
    }, {});

    setFormData({
      ...formData,
      ...selection,
      systemConfigs: systemConfigsInit,
    });
    nextStep();
  };

  const handleSystemConfig = (key: string, config: object) => {
    const updatedSystemConfigs = { ...formData.systemConfigs, [key]: config };
    setFormData({ ...formData, systemConfigs: updatedSystemConfigs });
    nextStep();
  };

  const handleMatchingConfig = (config: object) => {
    setFormData({ ...formData, matchingConfig: config });
  };

  const renderSystemConfigForms = () => {
    return Object.keys(formData.systemConfigs).map((key) => (
      <SystemConfigForm
        key={key}
        onConfigComplete={(config: object) => handleSystemConfig(key, config)}
      />
    ));
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <SelectionForm
          onSelection={handleSelection}
          solutions={solutions}
          onClose={onClose}
        />
      );
    } else if (currentStep <= Object.keys(formData.systemConfigs).length + 1) {
      return renderSystemConfigForms()[currentStep - 2];
    } else {
      return <MatchingConfigForm onConfigComplete={handleMatchingConfig} />;
    }
  };

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
        {renderStep()}
        <div
          className={`flex ${
            currentStep > 1 ? "justify-between" : "justify-end"
          } mt-4`}
        >
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Previous
            </button>
          )}
          {currentStep < Object.keys(formData.systemConfigs).length + 2 && (
            <button
              onClick={nextStep}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default InstanceForm;
