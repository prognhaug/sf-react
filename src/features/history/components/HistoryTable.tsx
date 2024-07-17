import { History } from "../../../lib";
import useFetch from "../../../hooks/useFetch";
import HistoryRow from "./HistoryRow";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ExtendedTask } from "../../../lib";

const HistoryTable = () => {
  const location = useLocation();
  const task = location.state as ExtendedTask;
  const { data: history } = useFetch<History[]>(
    `/api/instances/${task.data.companyID}/${task.data.instanceID}/history`
  );
  useEffect(() => {
    console.log("history", history);
  }, [history]);
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
            <HistoryRow key={h.runStartTimestamp} history={h} />
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
