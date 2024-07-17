import ReactDOM from "react-dom";
import LogsTable from "./LogsTable";
import { Icon } from "../../../components";
import { LogEntry } from "../../../lib";

interface LogsWindowProps {
  onClose: () => void;
  logEntries: LogEntry[];
}

const LogsWindow: React.FC<LogsWindowProps> = ({ logEntries, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 pt-10 px-48">
      <div className="relative w-full max-w-max p-4 backdrop-blur-lg bg-white/10 rounded-lg shadow-md mx-auto">
        <button
          onClick={onClose}
          aria-label="Close instance form"
          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-2"
        >
          <Icon name="xcircle" className="text-white" />
        </button>
        <LogsTable logEntries={logEntries} />
      </div>
    </div>,
    document.body
  );
};

export default LogsWindow;
