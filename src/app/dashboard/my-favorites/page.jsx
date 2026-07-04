"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function MyFavoritesPage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("All");

  const loadFavorites = async () => {
    if (!user?.email) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/favorites/${user.email}`,
    );

    const result = await res.json();

    setFavorites(result);
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const filteredFavorites = useMemo(() => {
    if (filter === "All") return favorites;

    return favorites.filter((item) => item.category === filter);
  }, [favorites, filter]);

  const categories = [
    "All",
    ...new Set(favorites.map((item) => item.category)),
  ];

  const handleRemove = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/favorite/${id}`,
      {
        method: "DELETE",
      },
    );

    const result = await res.json();

    if (result.deletedCount) {
      toast.success("Removed Successfully");
      loadFavorites();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
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

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No Favorite Lessons Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((lesson) => (
            <div
              key={lesson._id}
              className="border rounded-xl p-5 shadow bg-white"
            >
              <Image
                src={lesson.image || "/lesson-placeholder.jpg"}
                alt={lesson.title}
                width={400}
                height={250}
                className="rounded-lg h-52 object-cover w-full"
              />

              <h2 className="text-xl font-bold mt-4">{lesson.title}</h2>

              <p className="text-sm text-gray-500">{lesson.category}</p>

              <div className="flex justify-between mt-5">
                <Link
                  href={`/lessons/${lesson.lessonId}`}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleRemove(lesson._id)}
                  className="btn btn-error btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
