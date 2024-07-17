import { useEffect, useContext } from "react";
import { CompaniesContext } from "../context/";
import { Company } from "../lib/";
import isEqual from "lodash/isEqual";

const useUpdateCompaniesContext = (companies: Company[] | null) => {
  const { companies: currentCompanies, setCompanies } =
    useContext(CompaniesContext);

  useEffect(() => {
    if (companies !== null && !isEqual(companies, currentCompanies)) {
      setCompanies(companies);
    }
  }, [companies, currentCompanies, setCompanies]);
};

export default useUpdateCompaniesContext;
