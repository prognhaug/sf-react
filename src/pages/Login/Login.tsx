import Login from "../../components/Login";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-700">
      <div className="flex flex-col justify-start items-center w-3/4 pt-10">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
