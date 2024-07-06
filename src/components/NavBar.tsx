import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, NavigateFunction } from "react-router-dom";
import CompanySelect from "./CompanySelect";
import { CompanyContext } from "./CompanyContext"; // Import the context
interface NavBarProps {
  isLoggedIn: boolean;
}
// Refactor handleLogout to accept navigate as an argument with type NavigateFunction
const handleLogout = (navigate: NavigateFunction) => {
  // Clear user session or token from local storage
  localStorage.removeItem("token");

  // Navigate to the home page
  navigate("/");

  // Update the isLoggedIn state in the parent component, if applicable
  // This might require lifting state up or using a global state management solution
};

const NavBar = ({ isLoggedIn }: NavBarProps) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const { selectedCompanyId, setSelectedCompanyId } =
    useContext(CompanyContext); // Use context

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/companies/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCompanies(response.data.result.data);
        })
        .catch((error) => {
          console.error("Error fetching companies", error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompanyId(event.target.value);
  };

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="px-5 py-3 hover:bg-gray-700">
        {isLoggedIn && (
          <CompanySelect
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onSelectChange={handleSelectChange}
          />
        )}
      </div>
      <Link to="/" className="px-5 py-3 hover:bg-gray-700">
        Home
      </Link>
      {isLoggedIn && (
        <Link to="/setup" className="px-5 py-3 hover:bg-gray-700">
          Setup
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/dashboard" className="px-5 py-3 hover:bg-gray-700">
          Dashboard
        </Link>
      )}
      {!isLoggedIn ? (
        <Link to="/login" className="px-5 py-3 hover:bg-gray-700">
          Log In
        </Link>
      ) : (
        <span className="px-5 py-3">Welcome!</span>
      )}
      {isLoggedIn && (
        <button
          onClick={() => handleLogout(navigate)}
          className="px-5 py-3 hover:bg-gray-700 text-left"
        >
          Log Out
        </button>
      )}
    </nav>
  );
};

export default NavBar;
