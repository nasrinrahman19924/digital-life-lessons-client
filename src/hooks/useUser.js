"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const useUser = () => {
  const { data, isPending } = authClient.useSession();

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (data?.user?.email) {
      fetch(`https://digital-life-lessons-server-blush.vercel.app/api/users/${data.user.email}`)
        .then((res) => res.json())
        .then(setDbUser);
    }
  }, [data]);

  return {
    session: data,
    user: dbUser,
    loading: isPending,
  };
};

export default useUser;
