import { useEffect, useContext } from "react";
import { ConnectionContext } from "../context/";
import { Connection } from "../lib/";
import isEqual from "lodash/isEqual";

const useUpdateConnectionsContext = (connections: Connection[] | null) => {
  const { connections: currentConnections, setConnections } =
    useContext(ConnectionContext);

  useEffect(() => {
    if (connections !== null && !isEqual(connections, currentConnections)) {
      setConnections(connections);
    }
  }, [connections, currentConnections, setConnections]);
};

export default useUpdateConnectionsContext;
