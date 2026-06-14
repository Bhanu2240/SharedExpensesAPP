import { useEffect, useState } from "react";
import api from "../services/api";

function Expenses() {
  const [expenses, setExpenses] =
    useState([]);

  useEffect(() => {
    api
      .get("/expenses")
      .then((res) =>
        setExpenses(res.data.data)
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Expenses
        </h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {expenses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No expenses found
            </div>
          ) : (
            <table className="w-full">

              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Paid By
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>

                {expenses.map(
                  (expense) => (
                    <tr
                      key={expense.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        {expense.title}
                      </td>

                      <td className="p-4 text-green-600 font-semibold">
                        ₹{expense.amount}
                      </td>

                      <td className="p-4">
                        {expense.paidBy?.name}
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(
                          expense.expenseDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  );
}

export default Expenses;