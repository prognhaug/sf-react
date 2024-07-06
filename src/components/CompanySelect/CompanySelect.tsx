// CompanySelect.tsx
import React from "react";
import { Company } from "../../models/types";

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
    <select onChange={onSelectChange} value={selectedCompanyId}>
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
