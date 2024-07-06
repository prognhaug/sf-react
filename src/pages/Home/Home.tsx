import NavBar from "../../components/NavBar/NavBar";

const Home = () => {
  // Determine if user is logged in
  // This can be replaced with your actual logic for checking login status
  const isLoggedIn = true;

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
