import React from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const signIn = useSignIn();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      if (
        res.status === 200 &&
        signIn({
          auth: {
            token: res.data.result.data.accessToken,
            type: "Bearer",
          },
          userState: res.data.result.data.administrator,
        })
      ) {
        navigate("/dashboard");
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        alert("Invalid login credentials. Please try again.");
      } else if (axiosError.request) {
        alert("Network error. Please check your connection and try again.");
      } else {
        console.error(axiosError);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 border border-gray-200 rounded-lg shadow-lg">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { authService } from "../services/authService";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     const loginSuccessful = await authService.login(email, password);
//     if (loginSuccessful) {
//       navigate("/");
//     } else {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Log In</button>
//     </div>
//   );
// };

// export default Login;
