import { History, LogEntry } from "../../../lib";

interface HistoryRowProps {
  history: History;
  openLogsWindow: (logEntries: LogEntry[]) => void;
}

const HistoryRow: React.FC<HistoryRowProps> = ({ history, openLogsWindow }) => {
  const runStart = new Date(history.runStartTimestamp);
  const runStartString = runStart
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const runEnd = new Date(history.runEndTimestamp);
  const runEndString = runEnd
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  return (
    <tr className=" backdrop-blur-lg bg-white/5 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/5 ">
      <HistoryCell>{runStartString}</HistoryCell>
      <HistoryCell>{runEndString}</HistoryCell>
      <HistoryCell>
        <button>
          {history.payout?.payoutId ? history.payout.payoutId : "N/A"}
        </button>
      </HistoryCell>
      <HistoryCell>
        {history.matchedSettlements ? history.matchedSettlements : 0}
      </HistoryCell>
      <HistoryCell>
        {history.totalSettlements ? history.totalSettlements : 0}
      </HistoryCell>
      <HistoryCell>
        <button
          className="text-blue-500"
          onClick={() => openLogsWindow(history.logEntries)}
        >
          View
        </button>
      </HistoryCell>
    </tr>
  );
};

type HistoryCellProps = {
  children: React.ReactNode;
};

const HistoryCell: React.FC<HistoryCellProps> = ({ children }) => (
  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
    {children}
  </td>
);

export default HistoryRow;
