// CompanySelect.tsx
import React from "react";
import { Company } from "../../../lib/";

interface CompanySelectProps {
  companies: Company[];
  selectedCompanyId: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CompanySelect: React.FC<CompanySelectProps> = ({
  companies,
  selectedCompanyId,
  onSelectChange,
}) => {
  return (
    <select
      onChange={onSelectChange}
      value={selectedCompanyId}
      className="px-5 py-3 bg-gray-800 text-white hover:bg-gray-700"
    >
      <option value="">Select a company</option>
      {companies.map((company) => (
        <option key={company._id} value={company._id}>
          {company.name}
        </option>
      ))}
    </select>
  );
};

export default CompanySelect;
