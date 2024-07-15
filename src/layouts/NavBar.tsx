import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Company } from "../lib/";
import { CompanyContext } from "../context/";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useFetch from "../hooks/useFetch";
import { useUpdateCompaniesContext } from "../hooks/";

const companiesParamsObject = {
  // Define your parameters here
};

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setCompany } = useContext(CompanyContext);
  const [selectedCompany, setSelectedCompany] = useState<Company>();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: companies } = useFetch<Company[]>(
    "/api/companies/all",
    companiesParamsObject
  );

  useUpdateCompaniesContext(companies);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setCompany(company);
    toggleDropdown();
  };
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {isAuthenticated && (
        <>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="px-5 py-3 w-full text-left hover:bg-gray-700"
            >
              {selectedCompany?.name || "Choose Company"}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-full top-0 bg-gray-800 w-64 z-50">
                {companies
                  ?.filter((company) => company._id !== selectedCompany?._id)
                  .map((company) => (
                    <button
                      key={company._id}
                      className="px-5 py-3 hover:bg-gray-700 block border w-full"
                      onClick={() => {
                        handleSelectCompany(company);
                      }}
                    >
                      {company.name}
                    </button>
                  )) ?? null}
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
