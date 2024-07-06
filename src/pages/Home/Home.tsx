import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isTokenExpired = checkTokenExpiration(token);
      setIsLoggedIn(!isTokenExpired);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Function to decode the token and check expiration
  const checkTokenExpiration = (token: string) => {
    // Split the token into parts and decode the payload
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(window.atob(payload));

    // Get the current time and expiration time from the token
    const currentTime = Date.now() / 1000; // Convert to seconds
    const expirationTime = decodedPayload.exp;

    // Check if the current time is greater than the expiration time
    return currentTime > expirationTime;
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
