"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const useUser = () => {
  const { data, isPending } = authClient.useSession();

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (data?.user?.email) {
      fetch(`http://localhost:5000/api/users/${data.user.email}`)
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
