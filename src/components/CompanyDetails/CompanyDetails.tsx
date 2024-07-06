import React from "react";
import { Company } from "../../models/types";

const CompanyDetails: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div>
      <h3>Company Details</h3>
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{company._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{company.name}</td>
          </tr>
          {/* Render other company details as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyDetails;
