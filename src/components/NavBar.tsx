import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { fetchApiData } from "../utils/fetchApiData";
import { Company, Instance } from "../models/types";
import { CompanyContext } from "../context/CompanyContext";
import { InstanceContext } from "../context/InstanceContext";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { setInstances } = useContext(InstanceContext);
  const { setCompany } = useContext(CompanyContext);
  const [selectedCompanyName, setSelectedCompanyName] =
    useState("Choose Company");
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetchApiData<Company[]>(
            "/api/companies/all",
            {},
            authHeader
          );
          if (response !== "UNAUTHORIZED" && response !== null) {
            setCompanies(response);
          } else {
            console.error("Failed to fetch companies or unauthorized");
          }
        } catch (error) {
          console.error("Failed to fetch companies:", error);
        }
      }
    };
    const fetchInstances = async () => {
      if (isAuthenticated && selectedCompanyName !== "Choose Company") {
        try {
          const company = companies.find((c) => c.name === selectedCompanyName);
          if (company) {
            const response = await fetchApiData<Instance[]>(
              `/api/instances/${company.companyID}`,
              { fields: "solutionID" },
              authHeader
            );
            if (response !== "UNAUTHORIZED" && response !== null) {
              setInstances(response);
            } else {
              console.error("Failed to fetch instances or unauthorized");
            }
          }
        } catch (error) {
          console.error("Failed to fetch instances:", error);
        }
      }
    };

    fetchInstances();
    fetchCompanies();
  }, [
    isAuthenticated,
    authHeader,
    selectedCompanyName,
    companies,
    setInstances,
  ]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {isAuthenticated && (
        <>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-5 py-3 w-full text-left hover:bg-gray-700"
            >
              {selectedCompanyName}{" "}
              {/* Display the selected company's name or "Choose Company" */}
            </button>
            {isDropdownOpen && (
              <div>
                <button className="absolute left-0 bg-gray-800 w-full">
                  {companies.map((company) => (
                    <div
                      key={company._id}
                      className="px-5 py-3 hover:bg-gray-700 block"
                      onClick={() => {
                        setCompany(company);
                        setSelectedCompanyName(company.name);
                        toggleDropdown();
                      }}
                    >
                      {company.name}
                    </div>
                  ))}
                </button>
              </div>
            )}
          </div>
          <Link to="/setup" className="px-5 py-3 hover:bg-gray-700">
            Setup
          </Link>
          <Link to="/dashboard" className="px-5 py-3 hover:bg-gray-700">
            Dashboard
          </Link>
        </>
      )}
      {isAuthenticated ? (
        <Link to="/login" className="px-5 py-3 hover:bg-gray-700">
          Log Out
        </Link>
      ) : (
        <Link to="/login" className="px-5 py-3 hover:bg-gray-700">
          Log In
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
