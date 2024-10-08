import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setup from "./pages/Setup/Setup";
import "./index.css";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { Company, Instance, Connection } from "./lib";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { useState } from "react";
import { CompanyContext } from "./context/CompanyContext";
import { InstanceContext } from "./context/InstanceContext";
import { ConnectionContext } from "./context/ConnectionContext";
import { CompaniesContext } from "./context/CompaniesContext";
import NavBar from "./layouts/NavBar";
import { History } from "./pages/History/";
interface IUserData {
  name: string;
  uuid: string;
}

const store = createStore<IUserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

export default function App() {
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [instances, setInstances] = useState<Instance[] | undefined>(undefined);
  const [connections, setConnections] = useState<Connection[] | undefined>(
    undefined
  );
  const [companies, setCompanies] = useState<Company[] | undefined>(undefined);

  return (
    <AuthProvider store={store}>
      <CompaniesContext.Provider value={{ companies, setCompanies }}>
        <CompanyContext.Provider value={{ company, setCompany }}>
          <InstanceContext.Provider value={{ instances, setInstances }}>
            <ConnectionContext.Provider value={{ connections, setConnections }}>
              <Router>
                <div className="fixed inset-0 z-[-2] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                <div className="flex z-10 min-h-screen">
                  <div className="w-64 z-10">
                    <NavBar />
                  </div>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<AuthOutlet fallbackPath="/login" />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/history/:companyId/:instanceId"
                        element={<History />}
                      />
                      <Route path="/setup" element={<Setup />} />
                    </Route>
                  </Routes>
                </div>
              </Router>
            </ConnectionContext.Provider>
          </InstanceContext.Provider>
        </CompanyContext.Provider>
      </CompaniesContext.Provider>
    </AuthProvider>
  );
}
