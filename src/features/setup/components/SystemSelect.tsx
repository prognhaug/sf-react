import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../../utils/apiHandler";
import { System } from "../../../lib/";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface SystemSelectProps {
  selectedSystemId: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SystemSelect: React.FC<SystemSelectProps> = ({
  selectedSystemId,
  onSelectChange,
}) => {
  const [systems, setSystems] = useState<System[]>([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData<System[]>(
        "/api/systems/all",
        {},
        authHeader
      );
      if (data !== null) {
        setSystems(data);
      } else {
        console.error("Failed to fetch systems or unauthorized");
      }
    };

    fetchData();
  }, [authHeader, setSystems]);

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
