import React from "react";
import { System } from "../../models/types";

interface SystemSelectProps {
  systems: System[];
  selectedSystemId: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SystemSelect: React.FC<SystemSelectProps> = ({
  systems,
  selectedSystemId,
  onSelectChange,
}) => {
  return (
    <select onChange={onSelectChange} value={selectedSystemId}>
      <option value="">Select a system</option>
      {systems.map((system) => (
        <option key={system._id} value={system._id}>
          {system.name}
        </option>
      ))}
    </select>
  );
};

export default SystemSelect;
