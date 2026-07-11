"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserContext } from "@/providers/UserProvider";
import { Button } from "@heroui/react";

export default function ProfilePage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [dbUser, setDbUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then(setDbUser);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => setFavorites(Array.isArray(data) ? data : []));
  }, [user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const updatedUser = {
      name: form.get("name"),
      image: form.get("photo"),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      },
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Profile Updated Successfully");
    } else {
      toast.error(data.message || "Update Failed");
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={userInfo?.image || user?.image || "/user.png"}
            width={150}
            height={150}
            alt="profile"
            className="rounded-full border-4 border-indigo-500"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-bold">{user?.name}</h2>

            <p className="text-gray-500 mt-2">{user?.email}</p>

            {userInfo?.role === "premium" ? (
              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                ⭐ Premium User
              </span>
            ) : (
              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-gray-100 text-gray-600">
                Free User
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold text-indigo-600">
            {lessons.length}
          </h2>

          <p className="mt-2">Total Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold text-pink-600">
            {favorites.length}
          </h2>

          <p className="mt-2">Saved Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-4xl font-bold text-green-600">
            {lessons.filter((item) => item.visibility === "Public").length}
          </h2>

          <p className="mt-2">Public Lessons</p>
        </div>
      </div>

      {/* Update Profile */}

      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            name="name"
            defaultValue={userInfo?.name || user?.name || ""}
          />

          <input
            type="text"
            name="photo"
            defaultValue={userInfo?.image || user?.image || ""}
          />

          <input
            value={userInfo?.email || user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <Button color="primary" type="submit">
            Update Profile
          </Button>
        </form>
      </div>

      {/* Public Lessons */}

      <div>
        <h2 className="text-3xl font-bold mb-6">My Public Lessons</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {lessons
            .filter((lesson) => lesson.visibility === "Public")
            .map((lesson) => (
              <div key={lesson._id} className="bg-white rounded-xl shadow p-5">
                <img
                  src={lesson.image}
                  className="rounded-xl h-48 w-full object-cover"
                  alt=""
                />

                <h3 className="font-bold text-xl mt-4">{lesson.title}</h3>

                <p className="text-gray-500">{lesson.category}</p>

                <p className="mt-3">{lesson.description.slice(0, 90)}...</p>

                <Link
                  href={`/lesson/${lesson._id}`}
                  className="btn btn-primary btn-sm mt-4"
                >
                  Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
