import { Connection, System } from "../../../lib/";
import { Icon, Popup } from "../../../components";
import { CompanyContext, ConnectionContext } from "../../../context/";
import { useContext, useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Vipps from "../../../assets/Vipps";
import Tripletex from "../../../assets/Tripletex";

interface ConnectionCardProps {
  connection: Connection;
  triggerRefresh: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  connection,
  triggerRefresh,
}) => {
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);
  const { connections, setConnections } = useContext(ConnectionContext);
  const [showPopup, setShowPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isSystem = (SystemID: System | unknown): SystemID is System => {
    return (SystemID as System).name !== undefined;
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const SystemName =
    connection.systemID && isSystem(connection.systemID)
      ? connection.systemID.name
      : "";

  const handleDelete = async () => {
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `/api/connections/${company?.companyID}/${connection._id}`,
        { headers: { Authorization: authHeader } }
      );
      setConnections(
        connections?.filter((conn) => conn._id !== connection._id)
      );
      triggerRefresh();
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
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`z-10 ${
            isDropdownOpen ? "block" : "hidden"
          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Edit
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        {SystemName === "Vipps" ? (
          <Tripletex className="w-40 h-40" />
        ) : (
          <Vipps className="w-40 h-40" />
        )}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {connection.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {SystemName}
        </span>
      </div>
    </div>
    // <div className="relativ overflow-hidden p-3">
    //   <div className="relative">
    //     <button
    //       onClick={handleDelete}
    //       aria-label="Delete connection"
    //       className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
    //     >
    //       <Icon name="xcircle" className="text-white" />
    //     </button>
    //   </div>
    //   <div className="overflow-x-auto sm:rounded-lg">
    //     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    //       <tbody className="bg-white dark:bg-gray-800">
    //         <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //           <td className="px-6 py-4">Name</td>
    //           <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    //             {connection.name}
    //           </td>
    //         </tr>
    //         <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    //           <td className="px-6 py-4">System</td>
    //           <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    //             {SystemName}
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    //   {showPopup && (
    //     <Popup
    //       message="Are you sure you want to delete this connection?"
    //       onConfirm={confirmDelete}
    //       onCancel={cancelDelete}
    //     />
    //   )}
    // </div>
  );
};

export default ConnectionCard;
