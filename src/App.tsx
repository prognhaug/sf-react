import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Setup from "./pages/Setup/Setup";
import "./index.css";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
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
  return (
    <AuthProvider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setup" element={<Setup />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
