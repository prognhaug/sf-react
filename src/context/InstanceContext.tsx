import { createContext } from "react";
import { Instance } from "../models/types";

interface IInstanceContext {
  instances: Instance[] | undefined;
  setInstances: (instances: Instance[] | undefined) => void;
}

export const InstanceContext = createContext<IInstanceContext>({
  instances: undefined,
  setInstances: () => {},
});
