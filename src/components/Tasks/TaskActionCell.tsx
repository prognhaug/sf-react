import Icon from "../Icon";

const TaskActionCell = () => (
  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap flex justify-between">
    <button className="text-amber-500 hover:text-indigo-900">
      <Icon name="pencilSquare"></Icon>
    </button>
    <button className="text-red-600 hover:text-red-900">
      <Icon name="trashCan"></Icon>
    </button>
    <button className="text-green-600 hover:text-green-900">
      <Icon name="play"></Icon>
    </button>
    <button className="text-green-600 hover:text-green-900">
      <Icon name="book"></Icon>
    </button>
  </td>
);

export default TaskActionCell;
