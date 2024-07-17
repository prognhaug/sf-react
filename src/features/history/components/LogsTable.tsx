import { LogEntry } from "../../../lib/models/types";

interface LogsProps {
  logEntries: LogEntry[];
}

const LogsTable: React.FC<LogsProps> = ({ logEntries }) => {
  return (
    <div className="relative overflow-x-auto p-3 ">
      <h2 className="text-3xl font-bold dark:text-white mb-4 mt-4 text-center">
        Logs
      </h2>
      <table className="w-full text-sm text-left">
        <thead className="text-xs  uppercase ">
          <tr className=" text-white">
            <LogsHeader>Timestamp</LogsHeader>
            <LogsHeader>Level</LogsHeader>
            <LogsHeader>Message</LogsHeader>
          </tr>
        </thead>
        <tbody>
          {logEntries?.map((logEntry) => (
            <LogsRow key={logEntry._id} logEntry={logEntry} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface LogsHeaderProps {
  children: React.ReactNode;
}

const LogsHeader: React.FC<LogsHeaderProps> = ({ children }) => (
  <th scope="col" className="px-6 py-4">
    {children}
  </th>
);

interface LogsCellProps {
  children: React.ReactNode;
}

const LogsCell: React.FC<LogsCellProps> = ({ children }) => (
  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-normal">
    {children}
  </td>
);

interface LogsRowProps {
  logEntry: LogEntry;
}

const LogsRow: React.FC<LogsRowProps> = ({ logEntry }) => {
  const timestamp = new Date(logEntry.timestamp);
  const timestampString = timestamp
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  return (
    <tr className=" backdrop-blur-lg bg-white/5 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/5 ">
      <LogsCell>{timestampString}</LogsCell>
      <LogsCell>{logEntry.level}</LogsCell>
      <LogsCell>{logEntry.message}</LogsCell>
    </tr>
  );
};

export default LogsTable;
