"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Heart, PlusCircle, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [lessons, setLessons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/my/${user.email}`)
      .then((res) => res.json())
      .then((data) => setLessons(data));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [user]);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>

        <p className="text-gray-500 mt-2">Manage your life lessons here.</p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <BookOpen className="text-indigo-600" size={40} />

          <h2 className="text-3xl font-bold mt-3">{lessons.length}</h2>

          <p>Total Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Heart className="text-pink-500" size={40} />

          <h2 className="text-3xl font-bold mt-3">{favorites.length}</h2>

          <p>Saved Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <PlusCircle className="text-green-600" size={40} />

          <h2 className="text-xl font-semibold mt-4">Quick Action</h2>

          <Link
            href="/dashboard/add-lesson"
            className="flex items-center gap-2 text-indigo-600 mt-3"
          >
            Add New Lesson
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Recent Lessons */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Recently Added Lessons</h2>

        <div className="space-y-5">
          {lessons.slice(0, 5).map((lesson) => (
            <div
              key={lesson._id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{lesson.title}</h3>

                <p className="text-sm text-gray-500">{lesson.category}</p>
              </div>

              <Link href={`/lesson/${lesson._id}`} className="text-indigo-600">
                View
              </Link>
            </div>
          ))}

          {lessons.length === 0 && (
            <p className="text-gray-500">No lessons found.</p>
          )}
        </div>
      </div>

      {/* Analytics */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-indigo-100 rounded-lg p-6">
            <h3 className="text-3xl font-bold">{lessons.length}</h3>

            <p>Created</p>
          </div>

          <div className="bg-pink-100 rounded-lg p-6">
            <h3 className="text-3xl font-bold">{favorites.length}</h3>

            <p>Favorites</p>
          </div>

          <div className="bg-green-100 rounded-lg p-6">
            <h3 className="text-3xl font-bold">
              {lessons.filter((l) => l.access === "Premium").length}
            </h3>

            <p>Premium</p>
          </div>

          <div className="bg-yellow-100 rounded-lg p-6">
            <h3 className="text-3xl font-bold">
              {lessons.filter((l) => l.access === "Free").length}
            </h3>

            <p>Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}
