import { Connection, System } from "../models/types";
import Icon from "./Icon";
import { CompanyContext } from "../context/CompanyContext";
import { ConnectionContext } from "../context/ConnectionContext";
import { useContext, useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Popup from "./Popup"; // Import the Popup component

const ConnectionCard: React.FC<{ connection: Connection }> = ({
  connection,
}) => {
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);
  const { connections, setConnections } = useContext(ConnectionContext);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const isSystem = (SystemID: System | unknown): SystemID is System => {
    return (SystemID as System).name !== undefined;
  };

  const SystemName =
    connection.systemID && isSystem(connection.systemID)
      ? connection.systemID.name
      : "";

  const handleDelete = async () => {
    setShowPopup(true); // Show the popup when delete button is clicked
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `/api/connections/${company?.companyID}/${connection._id}`,
        { headers: { Authorization: authHeader } }
      );
      console.log("Connection deleted successfully");
      setConnections(
        connections?.filter((conn) => conn._id !== connection._id)
      );
    } catch (error) {
      console.error("Error deleting connection:", error);
    } finally {
      setShowPopup(false); // Hide the popup after deletion
    }
  };

  const cancelDelete = () => {
    setShowPopup(false); // Hide the popup if deletion is canceled
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <button onClick={handleDelete} aria-label="Delete connection">
        <Icon
          name="xcircle"
          // onClick is now handled by the button
        />
      </button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="bg-white dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Status</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {connection.active ? "Active" : "Inactive"}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Name</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {connection.name}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">System</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {SystemName}
            </td>
          </tr>
        </tbody>
      </table>
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

export default ConnectionCard;
