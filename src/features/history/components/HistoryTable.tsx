import { History } from "../../../lib";
import useFetch from "../../../hooks/useFetch";
import HistoryRow from "./HistoryRow";
import { useLocation } from "react-router-dom";
import { ExtendedTask } from "../../../lib";
import { LogEntry } from "../../../lib";

interface HistoryTableProps {
  openLogsWindow: (logEntries: LogEntry[]) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ openLogsWindow }) => {
  const location = useLocation();
  const task = location.state as ExtendedTask;
  const { data: history } = useFetch<History[]>(
    `/api/instances/${task.companyID}/${task.instanceID}/history`
  );
  return (
    <div className="relative overflow-x-auto p-3 ">
      <h2 className="text-3xl font-bold dark:text-white mb-4 mt-4 text-center">
        {task.companyInfo?.name}
      </h2>
      <h3 className="text-2xl font-bold dark:text-white mb-4 mt-4 text-center">
        {task.name}
      </h3>
      <table className="w-full text-sm text-left">
        <thead className="text-xs  uppercase ">
          <tr className=" text-white">
            <HistoryHeader>Run start</HistoryHeader>
            <HistoryHeader>Run end</HistoryHeader>
            <HistoryHeader>Payout</HistoryHeader>
            <HistoryHeader>Matched Settlements</HistoryHeader>
            <HistoryHeader>Total Settlements</HistoryHeader>
            <HistoryHeader>Logs</HistoryHeader>
          </tr>
        </thead>
        <tbody>
          {history?.map((h) => (
            <HistoryRow
              key={h._id}
              history={h}
              openLogsWindow={openLogsWindow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type HistoryHeaderProps = {
  children: React.ReactNode;
};

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ children }) => (
  <th scope="col" className="px-6 py-4">
    {children}
  </th>
);

export default HistoryTable;
