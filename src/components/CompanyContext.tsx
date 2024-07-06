import React, { createContext, useState, ReactNode } from "react";

export const CompanyContext = createContext({
  selectedCompanyId: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedCompanyId: (_id: string) => {},
});

interface CompanyProviderProps {
  children: ReactNode; // Define the type for children here
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  return (
    <CompanyContext.Provider
      value={{ selectedCompanyId, setSelectedCompanyId }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
