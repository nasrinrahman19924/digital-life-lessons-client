"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

    const loadLessons = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/lessons/my/${user.email}`,
          {
            credentials: "include",
          },
        );

        const result = await res.json();

        console.log("API Response:", result);

        if (!res.ok) {
          toast.error(result.message || "Failed to load lessons");
          setLessons([]);
          return;
        }

        setLessons(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [user?.email]);

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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (res.ok && data.deletedCount) {
        toast.success("Lesson Deleted");

        setLessons((prev) => prev.filter((lesson) => lesson._id !== id));
      } else {
        toast.error(data.message || "Delete Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">No Lessons Found</h2>

        <p className="text-gray-500 mt-2 mb-6">
          Start by adding your first lesson.
        </p>

        <Link href="/dashboard/add-lesson" className="btn btn-primary">
          Add Lesson
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Lessons</h1>

        <Link href="/dashboard/add-lesson" className="btn btn-primary">
          Add Lesson
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Access</th>
              <th>Visibility</th>
              <th>Likes</th>
              <th>Saved</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <td>{index + 1}</td>

                <td>
                  <Image
                    src={
                      lesson.image?.startsWith("http")
                        ? lesson.image
                        : "/lesson-placeholder.jpg"
                    }
                    alt={lesson.title}
                    width={70}
                    height={70}
                    className="rounded-lg h-14 w-20 object-cover"
                  />
                </td>

                <td className="font-semibold">{lesson.title}</td>

                <td>{lesson.category}</td>

                <td>
                  <span
                    className={`badge ${
                      lesson.isPremium ? "badge-warning" : "badge-success"
                    }`}
                  >
                    {lesson.isPremium ? "Premium" : "Free"}
                  </span>
                </td>

                <td>
                  <span className="badge badge-info">{lesson.visibility}</span>
                </td>

                <td>{lesson.likes || 0}</td>

                <td>{lesson.saved || 0}</td>

                <td>
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="btn btn-sm btn-outline"
                    >
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
