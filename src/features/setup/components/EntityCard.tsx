import { useContext, useState, useRef } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Icon, Popup } from "../../../components";
import { CompanyContext } from "../../../context";
import { useOutsideClick } from "../../../hooks";
import { Connection, Instance } from "../../../lib";

// Generic Entity Props
interface EntityCardProps {
  entity: Connection | Instance;
  triggerRefresh: () => void;
  apiEndpoint: string;
  customUI: JSX.Element;
}

// Generic Entity Card Component
const EntityCard = ({
  entity,
  triggerRefresh,
  apiEndpoint,
  customUI,
}: EntityCardProps): JSX.Element => {
  const authHeader = useAuthHeader();
  const { company } = useContext(CompanyContext);
  const [showPopup, setShowPopup] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick([dropdownRef, buttonRef], isDropdownOpen, () =>
    setIsDropdownOpen(false)
  );

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDelete = async () => {
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiEndpoint}/${company?.companyID}/${entity._id}`, {
        headers: { Authorization: authHeader },
      });
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting entity:", error);
    } finally {
      setShowPopup(false);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full max-w-sm backdrop-blur-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white/5 dark:border-gray-700">
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
      <div className="flex flex-col items-center pb-10">{customUI}</div>
      {showPopup && (
        <Popup
          message="Are you sure you want to delete this entity?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EntityCard;
