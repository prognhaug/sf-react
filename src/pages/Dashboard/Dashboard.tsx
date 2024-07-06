import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { Company, ApiResponse, SuccessApiResponse } from "../../models/types";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  function isSuccessApiResponse<T>(
    response: ApiResponse
  ): response is SuccessApiResponse<T> {
    return "result" in response;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get<ApiResponse>("/api/companies/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            fields: "users,instances,connections",
          },
        })
        .then((response) => {
          if (isSuccessApiResponse<Company[]>(response.data)) {
            // Now TypeScript knows response.data is SuccessApiResponse<Company[]>
            setCompanies(response.data.result.data);
          } else {
            // Handle FailApiResponse or ErrorApiResponse
            console.error("Failed to fetch companies");
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the companies", error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value;
    const company = companies.find((c) => c._id === companyId);
    setSelectedCompany(company || null);
  };

  return (
    <div className="flex">
      <div className="w-64">
        {" "}
        {/* Adjust width as needed */}
        <NavBar isLoggedIn={isLoggedIn} />
      </div>
      <div className="flex-grow p-4">
        {" "}
        {/* Content area with padding */}
        <h1>Dashboard Page</h1>
        <div>
          <h2>Companies</h2>
          <select
            onChange={handleSelectChange}
            value={selectedCompany?._id || ""}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
          {selectedCompany && <div>{/* Company details */}</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
