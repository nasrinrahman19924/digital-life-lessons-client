"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetch("https://digital-life-lessons-server-blush.vercel.app/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRole = async (id) => {
    const res = await fetch(`https://digital-life-lessons-server-blush.vercel.app/api/admin/users/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Admin Created");
      loadUsers();
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`https://digital-life-lessons-server-blush.vercel.app/api/admin/users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("User Deleted");
      loadUsers();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Total Lessons</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-info"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td>{user.totalLessons || 0}</td>

                <td>
                  <div className="flex gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRole(user._id)}
                        className="btn btn-success btn-sm"
                      >
                        Make Admin
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
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
