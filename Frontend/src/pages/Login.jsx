import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    try {
      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location =
        "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Shared Expenses App
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={login}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;