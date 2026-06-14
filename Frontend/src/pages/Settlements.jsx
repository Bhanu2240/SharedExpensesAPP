import {
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  GroupContext,
} from "../context/GroupContext";

function Settlements() {
  const { groupId } =
    useContext(GroupContext);

  const [settlements,
    setSettlements] =
      useState([]);

  useEffect(() => {
    if (!groupId) return;

    api
      .get(
        `/groups/${groupId}/settlements`
      )
      .then((res) =>
        setSettlements(
          res.data.data
        )
      );
  }, [groupId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8">
          Settlements
        </h2>

        {settlements.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No settlements required 🎉
          </div>
        ) : (
          <div className="space-y-4">

            {settlements.map(
              (s, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg">
                      <span className="font-bold text-red-600">
                        {s.from}
                      </span>

                      <span className="mx-2 text-gray-500">
                        pays
                      </span>

                      <span className="font-bold text-green-600">
                        {s.to}
                      </span>
                    </p>
                  </div>

                  <div className="text-xl font-bold text-blue-600">
                    ₹{s.amount}
                  </div>
                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Settlements;