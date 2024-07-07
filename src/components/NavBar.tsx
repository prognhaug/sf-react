import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { fetchApiData } from "../utils/fetchApiData";
import { Company } from "../models/types";

const NavBar = () => {
  const authHeader = useAuthHeader();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    fetchApiData<Company[]>("/api/companies/all", {}, authHeader);
  }, [authHeader]);

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <Link to="/" className="px-5 py-3 hover:bg-gray-700">
        Home
      </Link>
      {isAuthenticated && (
        <>
          <Link to="/setup" className="px-5 py-3 hover:bg-gray-700">
            Setup
          </Link>
          <Link to="/dashboard" className="px-5 py-3 hover:bg-gray-700">
            Dashboard
          </Link>
        </>
      )}
      <Link to="/login" className="px-5 py-3 hover:bg-gray-700">
        Log In
      </Link>
    </nav>
  );
};

export default NavBar;
