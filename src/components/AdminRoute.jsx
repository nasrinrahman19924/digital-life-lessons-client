"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push("/");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user?.role !== "admin") {
    return null;
  }

  return children;
};

export default AdminRoute;
