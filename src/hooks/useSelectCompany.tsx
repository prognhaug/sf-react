import { useEffect, useContext } from "react";
import { SelectedCompanyContext } from "../context/";
import { Company } from "../lib/";
import isEqual from "lodash/isEqual";

const useSelectCompany = (company: Company) => {
  const { selectedCompany: currentCompany, setSelectedCompany } = useContext(
    SelectedCompanyContext
  );

  useEffect(() => {
    if (company !== null && !isEqual(company, currentCompany)) {
      setSelectedCompany(company);
    }
  }, [company, currentCompany, setSelectedCompany]);
};

export default useSelectCompany;
