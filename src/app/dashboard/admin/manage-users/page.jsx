"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const { data = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
      );
      return res.data;
    },
  });

  const makeAdmin = async (id) => {
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
      role: "admin",
    });

    toast.success("User promoted");
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="space-y-4">
        {data.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white shadow rounded flex justify-between"
          >
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-sm">{user.email}</p>
              <p className="text-xs">Lessons: {user.totalLessons}</p>
              <p className="text-xs">Role: {user.role || "user"}</p>
            </div>

            <button
              onClick={() => makeAdmin(user._id)}
              className="btn btn-primary btn-sm"
            >
              Make Admin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
