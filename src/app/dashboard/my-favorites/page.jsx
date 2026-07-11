"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

export default function MyFavoritesPage() {
  const { data } = authClient.useSession();
  const user = data?.user;

  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/favorites/${user.email}`,
        {
          credentials: "include",
        },
      );

      const result = await res.json();

      setFavorites(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user?.email]);

  const filteredFavorites = useMemo(() => {
    if (filter === "All") return favorites;

    return favorites.filter((item) => item.category === filter);
  }, [favorites, filter]);

  const categories = [
    "All",
    ...new Set(favorites.map((item) => item.category)),
  ];

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove Favorite?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/favorite/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Removed Successfully");

      setFavorites((prev) => prev.filter((item) => item._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (filteredFavorites.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">No Favorite Lessons</h2>

        <p className="text-gray-500 mt-2">Save lessons to see them here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Favorites</h1>

        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>

              <th>Image</th>

              <th>Title</th>

              <th>Category</th>

              <th>Author</th>

              <th>Premium</th>

              <th>Added</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFavorites.map((lesson, index) => (
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

                <td>{lesson.authorName}</td>

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
                  {lesson.createdAt
                    ? new Date(lesson.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/lessons/${lesson.lessonId}`}
                      className="btn btn-sm btn-outline"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleRemove(lesson._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
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
