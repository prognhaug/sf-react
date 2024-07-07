import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { fetchApiData } from "../utils/fetchApiData";
import { Company } from "../models/types";
import { CompanyContext } from "../context/CompanyContext";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { setCompany } = useContext(CompanyContext);
  const [selectedCompanyName, setSelectedCompanyName] =
    useState("Choose Company");
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [isAuthenticated, authHeader]);

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
        <Link to="/logout" className="px-5 py-3 hover:bg-gray-700">
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
