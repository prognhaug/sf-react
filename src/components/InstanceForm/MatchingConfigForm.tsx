import React from "react";

interface MatchingConfigFormProps {
  onConfigComplete: (config: object) => void;
}

const MatchingConfigForm: React.FC<MatchingConfigFormProps> = ({
  onConfigComplete,
}) => {
  // Placeholder for the actual form logic
  return (
    <div>
      <button onClick={() => onConfigComplete({})}>
        Complete Matching Config
      </button>
    </div>
  );
};

export default MatchingConfigForm;
