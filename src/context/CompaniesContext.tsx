import { createContext } from "react";
import { Company } from "../models/types";

interface ICompaniesContext {
  companies: Company[] | undefined;
  setCompanies: (companies: Company[] | undefined) => void;
}

export const CompaniesContext = createContext<ICompaniesContext>({
  companies: undefined,
  setCompanies: () => {},
});
