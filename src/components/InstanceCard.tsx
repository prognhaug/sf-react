import { Instance, Solution } from "../models/types";
import { ConnectionContext } from "../context/ConnectionContext";
import { useContext, useState } from "react";
import { CompanyContext } from "../context/CompanyContext";
import { InstanceContext } from "../context/InstanceContext";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Icon from "./Icon";
import Popup from "./Popup";

const InstanceCard: React.FC<{ instance: Instance }> = ({ instance }) => {
  const authHeader = useAuthHeader();
  const { setInstances, instances } = useContext(InstanceContext);
  const { company } = useContext(CompanyContext);
  const { connections } = useContext(ConnectionContext);
  const [showPopup, setShowPopup] = useState(false);
  const isSolution = (
    solutionID: Solution | unknown
  ): solutionID is Solution => {
    return (solutionID as Solution).name !== undefined;
  };
  const solutionName =
    instance.solutionID && isSolution(instance.solutionID)
      ? instance.solutionID.name
      : "";
  const instanceConnections = instance.connections
    ? connections?.filter((conn) =>
        instance.connections.includes(conn._id as string)
      )
    : [];
  const handleDelete = async () => {
    setShowPopup(true); // Show the popup when delete button is clicked
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `/api/instances/${company?.companyID}/${instance._id}`,
        { headers: { Authorization: authHeader } }
      );
      console.log("instance deleted successfully");
      setInstances(instances?.filter((inst) => inst._id !== instance._id));
    } catch (error) {
      console.error("Error deleting instance:", error);
    } finally {
      setShowPopup(false); // Hide the popup after deletion
    }
  };

  const cancelDelete = () => {
    setShowPopup(false); // Hide the popup if deletion is canceled
  };
  return (
    <div className="relativ overflow-hidden p-3">
      <div className="relative">
        <button
          onClick={handleDelete}
          aria-label="Delete connection"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
      </div>
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody className="bg-white dark:bg-gray-800">
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Solution</td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {solutionName}
              </td>
            </tr>
            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Status</td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {instance.active ? "Active" : "Inactive"}
              </td>
            </tr>
            {instanceConnections?.map((connection) => (
              <tr
                key={connection._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">Connection</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {connection.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <Popup
          message="Are you sure you want to delete this connection?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default InstanceCard;
