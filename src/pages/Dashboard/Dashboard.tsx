import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
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
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
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
        {selectedCompany && (
          <div>
            <h3>Company Details</h3>
            <table>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{selectedCompany.companyID}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{selectedCompany.name}</td>
                </tr>
                <tr>
                  <td>Users</td>
                  <td>
                    {Array.isArray(selectedCompany.users) ? (
                      selectedCompany.users.map((user, index) =>
                        typeof user === "string" ? (
                          <span key={index}>{user}</span>
                        ) : (
                          <span
                            key={user._id}
                          >{`${user.firstName} ${user.lastName}`}</span>
                        )
                      )
                    ) : (
                      <span>{selectedCompany.users}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Instances</td>
                  <td>
                    {Array.isArray(selectedCompany.instances) ? (
                      selectedCompany.instances.map((instance, index) =>
                        typeof instance === "string" ? (
                          <span key={index}>{instance}</span>
                        ) : (
                          <span key={instance._id}>{instance.name}</span>
                        )
                      )
                    ) : (
                      <span>selectedCompany.instances</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Connections</td>
                  <td>
                    {Array.isArray(selectedCompany.connections) ? (
                      selectedCompany.connections.map((connection, index) =>
                        typeof connection === "string" ? (
                          <span key={index}>{connection}</span>
                        ) : (
                          <span key={connection._id}>{connection.name}</span>
                        )
                      )
                    ) : (
                      <span>{selectedCompany.connections}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Active</td>
                  <td>{selectedCompany.active}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
