import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImportPage from "./pages/ImportPage";
import IssuesPage from "./pages/IssuesPage";
import Balances from "./pages/Balances";
import Settlements from "./pages/Settlements";
import Expenses from "./pages/Expenses";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
  path="/import"
  element={<ImportPage />}
/>

<Route
  path="/issues"
  element={<IssuesPage />}
/>

<Route
  path="/balances"
  element={<Balances />}
/>

<Route
  path="/settlements"
  element={<Settlements />}
/>
<Route
  path="/expenses"
  element={<Expenses />}
/>
<Route
  path="/register"
  element={<Register />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;