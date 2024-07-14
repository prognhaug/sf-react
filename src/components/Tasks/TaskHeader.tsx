import React from "react";

type TaskHeaderProps = {
  children: React.ReactNode;
};

const TaskHeader: React.FC<TaskHeaderProps> = ({ children }) => (
  <th scope="col" className="px-6 py-4">
    {children}
  </th>
);

export default TaskHeader;
