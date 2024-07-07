import { Company } from "../models/types";

const CompanyDetails: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <h2 className="text-xl font-semibold leading-tight text-white">
        Company Details
      </h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="bg-white dark:bg-gray-800">
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">ID</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {company.companyID}
            </td>
          </tr>
          <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">Name</td>
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {company.name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDetails;
