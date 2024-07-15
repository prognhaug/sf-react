import { useEffect, useContext } from "react";
import { InstanceContext } from "../context/";
import { Instance } from "../lib/";
import isEqual from "lodash/isEqual";

const useUpdateInstancesContext = (instances: Instance[] | null) => {
  const { instances: currentInstances, setInstances } =
    useContext(InstanceContext);

  useEffect(() => {
    if (instances !== null && !isEqual(instances, currentInstances)) {
      setInstances(instances);
    }
  }, [instances, currentInstances, setInstances]);
};

export default useUpdateInstancesContext;
