import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";

import GroupProvider
from "./context/GroupContext";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <GroupProvider>

      <App />

    </GroupProvider>

  </StrictMode>

);