import NavBar from "../../components/NavBar"; // Adjust the import path based on your project structure

const Setup = () => {
  return (
    <div>
      <NavBar isLoggedIn={true} />{" "}
      {/* Assuming isLoggedIn prop is required for NavBar */}
      {/* Setup page content will go here */}
    </div>
  );
};

export default Setup;
