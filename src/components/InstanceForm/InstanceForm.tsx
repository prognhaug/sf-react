import React, { useState } from "react";
import SelectionForm from "./SelectionForm";
import SystemConfigForm from "./SystemConfigForm";
import MatchingConfigForm from "./MatchingConfigForm";

interface FormData {
  solutionId: string;
  connections: string[];
  systemConfigs: { [key: string]: object };
  matchingConfig: object;
}

const InstanceForm = () => {
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
    const systemConfigsInit = selection.connections.reduce((acc, curr) => {
      acc[curr] = {}; // Initialize each system config as empty
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
    return Object.keys(formData.systemConfigs).map((key, index) => (
      <SystemConfigForm
        key={key}
        onConfigComplete={(config) => handleSystemConfig(key, config)}
      />
    ));
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return <SelectionForm onSelection={handleSelection} />;
    } else if (currentStep <= Object.keys(formData.systemConfigs).length + 1) {
      return renderSystemConfigForms()[currentStep - 2];
    } else {
      return <MatchingConfigForm onConfigComplete={handleMatchingConfig} />;
    }
  };

  return (
    <div>
      {renderStep()}
      {currentStep > 1 && <button onClick={prevStep}>Back</button>}
    </div>
  );
};

export default InstanceForm;
