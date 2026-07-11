"use client";

import { Avatar, Button, Chip } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
  });

  const handleRole = async (id, role) => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
      { role },
      {
        withCredentials: true,
      },
    );

    if (res.data.modifiedCount) {
      toast.success("Role Updated");
      refetch();
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
      {
        withCredentials: true,
      },
    );

    if (res.data.deletedCount) {
      toast.success("User Deleted");
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Lessons</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-default-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.image} name={user.name} size="md" />

                    <div>
                      <p className="font-semibold">{user.name}</p>

                      <p className="text-xs text-default-500">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">{user.email}</td>

                <td className="p-4 text-center">
                  <Chip color="primary" variant="flat">
                    {user.totalLessons}
                  </Chip>
                </td>

                <td className="p-4 text-center">
                  <Chip
                    color={user.role === "admin" ? "success" : "warning"}
                    variant="flat"
                  >
                    {user.role || "user"}
                  </Chip>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      color={user.role === "admin" ? "warning" : "success"}
                      size="sm"
                      onPress={() =>
                        handleRole(
                          user._id,
                          user.role === "admin" ? "user" : "admin",
                        )
                      }
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </Button>

                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
