"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HeroUIProvider } from "@heroui/react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  // React Query Client
  const [queryClient] = useState(() => new QueryClient());

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session]);

  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          {children}
        </UserContext.Provider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
