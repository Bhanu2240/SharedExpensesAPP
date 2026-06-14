import { useState } from "react";
import api from "../services/api";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register =
    async () => {

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
          error.response?.data?.message
        );

      }

    };

  return (
    <div>

      <h1>Register</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button onClick={register}>
        Register
      </button>

    </div>
  );
}

export default Register;