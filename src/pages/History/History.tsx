import { HistoryTable } from "../../features";
import LogsWindow from "../../features/history/components/LogsWindow";
import { LogEntry } from "../../lib";
import { useState } from "react";

function History() {
  const [showLogsWindow, setShowLogsWindow] = useState<boolean>(false);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const handleOpenLogsWindow = (logEntries: LogEntry[]) => {
    setLogEntries(logEntries);
    setShowLogsWindow((prev) => !prev);
  };

  const handleCloseLogsWindow = () => {
    setShowLogsWindow(false);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center w-full px-5">
        <h1 className="text-3xl font-bold dark:text-white mb-4 mt-4">
          History
        </h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500 w-full" />
      </div>
      <div className="flex-1">
        <HistoryTable openLogsWindow={handleOpenLogsWindow} />
      </div>
      {showLogsWindow && (
        <LogsWindow onClose={handleCloseLogsWindow} logEntries={logEntries} />
      )}
    </div>
  );
}

export default History;
