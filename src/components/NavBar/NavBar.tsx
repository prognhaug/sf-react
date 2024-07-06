import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {!isLoggedIn ? (
        <Link to="/login">Log In</Link>
      ) : (
        // Add more links or options here as needed when logged in
        <span>Welcome!</span>
      )}
    </nav>
  );
};

export default NavBar;
