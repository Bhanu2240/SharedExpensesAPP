import { useState } from "react";
import api from "../services/api";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    try {

      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration successful"
      );

      window.location = "/";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Register to continue
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={register}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Register
          </button>

          <div className="text-center mt-4">

            <a
              href="/"
              className="text-blue-500 hover:underline"
            >
              Already have an account? Login
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;