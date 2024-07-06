import { Link, useNavigate, NavigateFunction } from "react-router-dom";

// Refactor handleLogout to accept navigate as an argument with type NavigateFunction
const handleLogout = (navigate: NavigateFunction) => {
  // Clear user session or token from local storage
  localStorage.removeItem("token");

  // Navigate to the home page
  navigate("/");

  // Update the isLoggedIn state in the parent component, if applicable
  // This might require lifting state up or using a global state management solution
};

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate(); // Use useNavigate here

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn ? <Link to="/dashboard">Dashboard</Link> : null}
      {!isLoggedIn ? <Link to="/login">Log In</Link> : <span>Welcome!</span>}
      {isLoggedIn ? (
        <button onClick={() => handleLogout(navigate)}>Log Out</button>
      ) : null}
    </nav>
  );
};

export default NavBar;
