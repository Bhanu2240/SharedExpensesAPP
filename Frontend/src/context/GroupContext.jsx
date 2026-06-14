import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

export const GroupContext =
  createContext();

function GroupProvider({
  children,
}) {

  const [groupId, setGroupId] =
    useState(null);

  useEffect(() => {

    const fetchGroup =
      async () => {

        try {

          const res =
            await api.get("/groups");

          if (
            res.data.data.length > 0
          ) {
            setGroupId(
              res.data.data[0].id
            );
          }

        } catch (error) {
          console.log(error);
        }

      };

    fetchGroup();

  }, []);

  return (
    <GroupContext.Provider
      value={{
        groupId,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export default GroupProvider;