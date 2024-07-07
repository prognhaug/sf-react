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
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type={"email"}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type={"password"}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button>Submit</button>
    </form>
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
