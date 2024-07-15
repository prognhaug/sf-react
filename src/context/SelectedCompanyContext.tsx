import { createContext } from "react";
import { Company } from "../lib";

interface ISelectedCompanyContext {
  selectedCompany: Company | undefined;
  setSelectedCompany: (company: Company | undefined) => void;
}

export const SelectedCompanyContext = createContext<ISelectedCompanyContext>({
  selectedCompany: undefined,
  setSelectedCompany: () => {},
});
