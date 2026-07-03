"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddLessonPage() {
  const { data } = authClient.useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const lesson = {
      title: form.get("title"),
      category: form.get("category"),
      description: form.get("description"),
      authorName: data.user.name,
      authorEmail: data.user.email,
      authorImage: data.user.image,
      isFeatured: false,
      isPremium: false,
    };

    const res = await fetch("https://digital-life-lessons-server-blush.vercel.app/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    });

    if (res.ok) {
      toast.success("Lesson Added");
      e.target.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-xl shadow"
    >
      <input
        name="title"
        placeholder="Title"
        className="border p-3 rounded-lg w-full"
      />

      <input
        name="category"
        placeholder="Category"
        className="border p-3 rounded-lg w-full"
      />

      <textarea
        name="description"
        rows="6"
        placeholder="Description"
        className="border p-3 rounded-lg w-full"
      />

      <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
        Add Lesson
      </button>
    </form>
  );
}
