import NavBar from "../../components/NavBar";
import CompanyDetails from "../../components/CompanyDetails";
import { CompanyContext } from "../../context/CompanyContext";
import { useContext } from "react";

const Setup = () => {
  const { company } = useContext(CompanyContext);
  return (
    <div className="flex min-h-screen bg-gray-700">
      <div className="w-64">
        <NavBar />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-white mt-4 mb-2">Setup Page</h1>
        <div className="w-full p-4">
          {company && <CompanyDetails company={company} />}
        </div>
      </div>
    </div>
  );
};

export default Setup;
