import { Connection, System } from "../../../lib/";
import { Icon, Popup } from "../../../components";
import { CompanyContext, ConnectionContext } from "../../../context/";
import { useContext, useState, useRef } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Vipps from "../../../assets/Vipps";
import Tripletex from "../../../assets/Tripletex";
import { useOutsideClick } from "../../../hooks/";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([dropdownRef, buttonRef], isDropdownOpen, () =>
    setIsDropdownOpen(false)
  );

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
      setShowPopup(false);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4 relative">
        <button
          ref={buttonRef}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <Icon name="threeDots" />
        </button>
        <div
          ref={dropdownRef}
          className={`z-10 ${
            isDropdownOpen ? "block" : "hidden"
          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full mt-1`}
        >
          <ul className="py-2">
            <li>
              <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Edit
              </button>
            </li>
            <li>
              <button
                className="w-full block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                  handleDelete();
                  setIsDropdownOpen(false);
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        {SystemName === "Tripletex" ? (
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
      {showPopup && (
        <Popup
          message="Are you sure you want to delete this connection?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
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
