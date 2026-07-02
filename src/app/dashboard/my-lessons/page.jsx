"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function MyLessonsPage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/lessons/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lesson?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:5000/api/lessons/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Lesson Deleted");

      setLessons(lessons.filter((lesson) => lesson._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Lessons</h1>

        <Link
          href="/dashboard/add-lesson"
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
        >
          Add Lesson
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Title</th>

              <th>Category</th>

              <th>Access</th>

              <th>Visibility</th>

              <th>Reactions</th>

              <th>Favorites</th>

              <th>Created</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>

                <td>{lesson.title}</td>

                <td>{lesson.category}</td>

                <td>
                  <span
                    className={`badge ${
                      lesson.access === "Premium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {lesson.access}
                  </span>
                </td>

                <td>
                  <span className="badge badge-info">{lesson.visibility}</span>
                </td>

                <td>{lesson.reactionCount}</td>

                <td>{lesson.favoriteCount}</td>

                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>

                <td>
                  <div className="flex gap-2">
                    <Link href={`/lesson/${lesson._id}`} className="btn btn-sm">
                      Details
                    </Link>

                    <Link
                      href={`/dashboard/update-lesson/${lesson._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-sm btn-error"
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
