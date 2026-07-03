"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AdminProfilePage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.image || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("https://digital-life-lessons-server-blush.vercel.app/api/admin/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name,
        image: photo,
      }),
    });

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Profile Updated");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex flex-col items-center">
          <Image
            src={photo || "/user.png"}
            width={140}
            height={140}
            alt="Admin"
            className="rounded-full border-4 border-indigo-600"
          />

          <h2 className="text-3xl font-bold mt-5">{user?.name}</h2>

          <p className="text-gray-500">{user?.email}</p>

          <span className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-full font-semibold">
            👑 Administrator
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-indigo-600">120</h2>

          <p className="mt-2">Lessons Moderated</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-green-600">58</h2>

          <p className="mt-2">Users Managed</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-4xl font-bold text-red-600">24</h2>

          <p className="mt-2">Reports Resolved</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered w-full"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <input
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100"
          />

          <button className="btn btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </div>
  );
}
