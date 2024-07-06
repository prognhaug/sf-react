import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../utils/fetchApiData";
import { System } from "../../models/types";

interface SystemSelectProps {
  selectedSystemId: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SystemSelect: React.FC<SystemSelectProps> = ({
  selectedSystemId,
  onSelectChange,
}) => {
  const [systems, setSystems] = useState<System[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData<System[]>("/api/systems/all", {});
      if (data !== "UNAUTHORIZED" && data !== null) {
        setSystems(data);
      } else {
        console.error("Failed to fetch systems or unauthorized");
      }
    };

    fetchData();
  }, []);

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
