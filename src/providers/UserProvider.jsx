"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!session?.user?.email) {
      setUserInfo(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`,
      );

      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session?.user?.email]);

  return (
    <UserContext.Provider
      value={{
        session,
        userInfo,
        loading: loading || isPending,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
