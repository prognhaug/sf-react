import { createContext } from "react";
import { Company } from "../models/types";

interface ICompanyContext {
  company: Company | undefined;
  setCompany: (company: Company | undefined) => void;
}

export const CompanyContext = createContext<ICompanyContext>({
  company: undefined,
  setCompany: () => {},
});
