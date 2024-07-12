import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { fetchApiData } from "../utils/apiHandler";
import { Company, Instance, Connection } from "../models/types";
import { CompanyContext } from "../context/CompanyContext";
import { InstanceContext } from "../context/InstanceContext";
import { ConnectionContext } from "../context/ConnectionContext";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { setInstances } = useContext(InstanceContext);
  const { company, setCompany } = useContext(CompanyContext);
  const { setConnections } = useContext(ConnectionContext);
  const [selectedCompanyName, setSelectedCompanyName] =
    useState("Choose Company");
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchCompanies = async () => {
      try {
        const response = await fetchApiData<Company[]>(
          "/api/companies/all",
          {},
          authHeader
        );
        if (response !== null) {
          setCompanies(response);
        } else {
          console.error("Failed to fetch companies or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchCompanies();
  }, [isAuthenticated, authHeader]);

  // Fetch instances only when selectedCompanyName changes and meets conditions
  useEffect(() => {
    if (!isAuthenticated || selectedCompanyName === "Choose Company") return;
    const fetchInstances = async () => {
      const company = companies.find((c) => c.name === selectedCompanyName);
      if (!company) return;
      try {
        const response = await fetchApiData<Instance[] | null>(
          `/api/instances/${company.companyID}`,
          { fields: "solutionID", filter: '{ "active": "true" }' },
          authHeader
        );
        if (response === null) {
          setInstances([]);
          return;
        } else if (response !== null) {
          setInstances(response);
        } else {
          console.error("Failed to fetch instances or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch instances:", error);
      }
    };
    const fetchConnections = async () => {
      const company = companies.find((c) => c.name === selectedCompanyName);
      if (!company) return;
      try {
        const response = await fetchApiData<Connection[] | null>(
          `/api/connections/${company.companyID}`,
          { fields: "systemID" },
          authHeader
        );
        if (response === null) {
          setConnections([]);
          return;
        } else if (response !== null) {
          setConnections(response);
        } else {
          console.error("Failed to fetch connections or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      }
    };
    fetchConnections();
    fetchInstances();
  }, [
    isAuthenticated,
    selectedCompanyName,
    companies,
    authHeader,
    setInstances,
    setConnections,
  ]);

  // Optionally, handle selectedCompanyName update based on company changes
  useEffect(() => {
    setSelectedCompanyName(company?.name || "Choose Company");
  }, [company]);

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
          <Link
            to="/setup"
            className={`px-5 py-3 ${
              isActive("/setup") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Setup
          </Link>
          <Link
            to="/dashboard"
            className={`px-5 py-3 ${
              isActive("/dashboard") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/multistep"
            className={`px-5 py-3 ${
              isActive("/multistep") ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            MultiStep
          </Link>
        </>
      )}
      {isAuthenticated ? (
        <button
          className="px-5 py-3 hover:bg-gray-700 text-left"
          onClick={() => {
            signOut();
            navigate("/login");
          }}
        >
          Log Out
        </button>
      ) : (
        <Link
          to="/login"
          className={`px-5 py-3 ${
            isActive("/login") ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
