import React from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-4 rounded shadow-lg text-white">
        <p>{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
