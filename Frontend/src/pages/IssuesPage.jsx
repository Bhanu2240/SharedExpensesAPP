import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

function IssuesPage() {
  const [issues, setIssues] =
    useState([]);

  const fetchIssues =
    async () => {
      const res =
        await api.get(
          "/import/issues"
        );

      setIssues(
        res.data.data
      );
    };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus =
    async (id, status) => {
      await api.patch(
        `/import/issues/${id}`,
        { status }
      );

      fetchIssues();
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Import Issues
        </h2>

        {issues.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No issues found
          </div>
        ) : (
          <div className="space-y-4">

            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <div className="grid md:grid-cols-2 gap-3 mb-4">

                  <p>
                    <span className="font-semibold">
                      Row:
                    </span>{" "}
                    {issue.rowNumber}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Type:
                    </span>{" "}
                    {issue.issueType}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Severity:
                    </span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        issue.severity === "HIGH"
                          ? "bg-red-500"
                          : issue.severity === "MEDIUM"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        issue.status === "APPROVED"
                          ? "bg-green-500"
                          : issue.status === "REJECTED"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(
                        issue.id,
                        "APPROVED"
                      )
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        issue.id,
                        "REJECTED"
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default IssuesPage;