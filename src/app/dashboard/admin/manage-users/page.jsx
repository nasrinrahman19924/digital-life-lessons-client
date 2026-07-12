"use client";

import { useMemo, useState } from "react";
import { Avatar, Button, Chip, Card, Input, Spinner } from "@heroui/react";
import { Search, Users, Crown, BookOpen, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [search, setSearch] = useState("");

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

  const totalUsers = users.length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const totalPremium = users.filter((user) => user.isPremium).length;

  const totalLessons = users.reduce(
    (sum, user) => sum + (user.totalLessons || 0),
    0,
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.name?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

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
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">Manage Users</h1>

        <p className="text-default-500 mt-2">
          Manage all registered users and platform administrators.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500 text-sm">Total Users</p>

              <h2 className="text-4xl font-bold mt-2">{totalUsers}</h2>
            </div>

            <Users className="text-blue-600" size={34} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500 text-sm">Admins</p>

              <h2 className="text-4xl font-bold mt-2">{totalAdmins}</h2>
            </div>

            <ShieldCheck className="text-green-600" size={34} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500 text-sm">Premium Users</p>

              <h2 className="text-4xl font-bold mt-2">{totalPremium}</h2>
            </div>

            <Crown className="text-yellow-500" size={34} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-default-500 text-sm">Total Lessons</p>

              <h2 className="text-4xl font-bold mt-2">{totalLessons}</h2>
            </div>

            <BookOpen className="text-purple-600" size={34} />
          </div>
        </Card>
      </div>

      {/* Search */}

      <Input
        value={search}
        onValueChange={setSearch}
        placeholder="Search by name or email..."
        startContent={<Search size={18} />}
        className="max-w-md"
      />
      {/* Users Table */}

      <div className="overflow-x-auto rounded-2xl border border-default-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="px-5 py-4 text-left">User</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-center">Joined</th>
              <th className="px-5 py-4 text-center">Lessons</th>
              <th className="px-5 py-4 text-center">Premium</th>
              <th className="px-5 py-4 text-center">Role</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-default-50 transition"
              >
                {/* User */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.image} name={user.name} size="md" />

                    <div>
                      <h3 className="font-semibold">{user.name}</h3>

                      <p className="text-xs text-default-500">
                        ID : {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-4">{user.email}</td>

                {/* Joined */}
                <td className="px-5 py-4 text-center">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* Lessons */}
                <td className="px-5 py-4 text-center">
                  <Chip color="primary" variant="flat">
                    {user.totalLessons || 0}
                  </Chip>
                </td>

                {/* Premium */}
                <td className="px-5 py-4 text-center">
                  <Chip
                    color={user.isPremium ? "warning" : "default"}
                    variant="flat"
                  >
                    {user.isPremium ? "Premium" : "Free"}
                  </Chip>
                </td>

                {/* Role */}
                <td className="px-5 py-4 text-center">
                  <Chip
                    color={user.role === "admin" ? "success" : "primary"}
                    variant="flat"
                  >
                    {user.role || "user"}
                  </Chip>
                </td>

                {/* Status */}
                <td className="px-5 py-4 text-center">
                  <Chip color="success" variant="dot">
                    Active
                  </Chip>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      color={user.role === "admin" ? "warning" : "success"}
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
                      size="sm"
                      color="danger"
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

        {/* Empty State */}

        {filteredUsers.length === 0 && (
          <div className="py-16 text-center">
            <Users size={60} className="mx-auto text-default-300 mb-4" />

            <h3 className="text-2xl font-semibold">No Users Found</h3>

            <p className="text-default-500 mt-2">
              Try searching with a different name or email.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
        <p className="text-sm text-default-500">
          Showing <span className="font-semibold">{filteredUsers.length}</span>{" "}
          of <span className="font-semibold">{totalUsers}</span> users
        </p>

        <Chip color="primary" variant="flat">
          Digital Life Lessons Admin Panel
        </Chip>
      </div>
    </div>
  );
}
