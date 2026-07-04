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

      visibility: "Public",

      isFeatured: false,
      isPremium: false,

      likes: 0,
      saved: 0,
      reportCount: 0,
      reviewed: false,

      createdAt: new Date(),
    };

    const res = await fetch(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lesson),
      },
    );

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
      <input
        name="image"
        type="text"
        placeholder="Lesson Image URL"
        className="border p-3 rounded-lg w-full"
      />
      <select name="visibility" className="border p-3 rounded-lg w-full">
        <option value="Public">Public</option>

        <option value="Private">Private</option>
      </select>
      <select name="premium" className="border p-3 rounded-lg w-full">
        <option value="no">Free Lesson</option>

        <option value="yes">Premium Lesson</option>
      </select>

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
