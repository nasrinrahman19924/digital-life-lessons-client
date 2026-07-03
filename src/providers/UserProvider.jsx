"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(
          `${process.env.BETTER_AUTH_URL}/api/users/${session.user.email}`,
        )

        .then((res) => {
          setUserInfo(res.data);
        });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
