import {
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  GroupContext,
} from "../context/GroupContext";

function Balances() {
  const { groupId } =
    useContext(GroupContext);

  const [balances,
    setBalances] =
      useState([]);

  useEffect(() => {
    if (!groupId) return;

    api
      .get(
        `/groups/${groupId}/balances`
      )
      .then((res) =>
        setBalances(
          res.data.data
        )
      );
  }, [groupId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Group Balances
        </h2>

        {balances.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No balances found
          </div>
        ) : (
          <div className="grid gap-4">
            {balances.map((b) => (
              <div
                key={b.user}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold">
                  {b.user}
                </h3>

                <p
                  className={`text-xl font-bold ${
                    b.balance >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{b.balance}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Balances;