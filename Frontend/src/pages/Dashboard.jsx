import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setStats(res.data.data));
  }, []);

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-8">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold">
              {stats.totalExpenses}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Groups
            </h3>
            <p className="text-3xl font-bold">
              {stats.totalGroups}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Users
            </h3>
            <p className="text-3xl font-bold">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Pending Issues
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {stats.pendingIssues}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          
          <Link
            to="/import"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600"
          >
            Import CSV
          </Link>

          <Link
            to="/issues"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-center hover:bg-yellow-600"
          >
            Import Issues
          </Link>

          <Link
            to="/balances"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600"
          >
            Balances
          </Link>

          <Link
            to="/settlements"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-600"
          >
            Settlements
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;