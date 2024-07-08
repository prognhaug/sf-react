import { createContext } from "react";
import { Connection } from "../models/types";

interface IConnectionContext {
  connections: Connection[] | undefined;
  setConnections: (connections: Connection[] | undefined) => void;
}

export const ConnectionContext = createContext<IConnectionContext>({
  connections: undefined,
  setConnections: () => {},
});
