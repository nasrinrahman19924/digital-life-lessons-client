"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddLessonPage() {
  const router = useRouter();

  const { data } = authClient.useSession();

  const user = data?.user;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.target);

    const lesson = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      emotion: form.get("emotion"),
      image: form.get("image"),
      access:
        user?.isPremium && form.get("access") === "Premium"
          ? "Premium"
          : "Free",
      visibility: "Public",
      authorName: user?.name,
      authorEmail: user?.email,
      authorImage: user?.image,
      createdAt: new Date(),
      reactionCount: 0,
      favoriteCount: 0,
      isFeatured: false,
    };

    const res = await fetch("http://localhost:5000/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    });

    const result = await res.json();

    if (result.insertedId) {
      toast.success("Lesson Added Successfully");
      router.push("/dashboard/my-lessons");
    } else {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Lesson Title"
          required
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          rows="6"
          placeholder="Full Description"
          required
          className="w-full border rounded-lg p-3"
        />

        <select name="category" className="w-full border rounded-lg p-3">
          <option>Personal Growth</option>
          <option>Career</option>
          <option>Relationships</option>
          <option>Mindset</option>
          <option>Mistakes Learned</option>
        </select>

        <select name="emotion" className="w-full border rounded-lg p-3">
          <option>Motivational</option>
          <option>Sad</option>
          <option>Realization</option>
          <option>Gratitude</option>
        </select>

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border rounded-lg p-3"
        />

        <select
          name="access"
          disabled={!user?.isPremium}
          className="w-full border rounded-lg p-3"
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>

        {!user?.isPremium && (
          <p className="text-red-500 text-sm">
            Upgrade to Premium to create Premium lessons.
          </p>
        )}

        <button
          disabled={loading}
          className="bg-indigo-600 text-white w-full rounded-lg p-3"
        >
          {loading ? "Saving..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
}
