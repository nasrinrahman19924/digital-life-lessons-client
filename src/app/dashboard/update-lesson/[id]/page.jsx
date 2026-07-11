"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateLessonPage() {
  const { id } = useParams();

  const router = useRouter();

  const { data } = authClient.useSession();

  const user = data?.user;

  const [lesson, setLesson] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons/single/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const updatedLesson = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      emotion: form.get("emotion"),
      image: form.get("image"),
      visibility: form.get("visibility"),
      isPremium: user?.role === "premium" && form.get("access") === "Premium",
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLesson),
      },
    );

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Lesson Updated Successfully");

      router.push("/dashboard/my-lessons");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Update Lesson</h1>

      <form onSubmit={handleUpdate} className="space-y-5">
        <input
          defaultValue={lesson?.title}
          name="title"
          className="input input-bordered w-full"
        />

        <textarea
          defaultValue={lesson?.description}
          rows="6"
          name="description"
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          name="category"
          defaultValue={lesson?.category}
          placeholder="Enter Category"
          className="input input-bordered w-full"
        />

        <select
          defaultValue={lesson?.emotion}
          name="emotion"
          className="select select-bordered w-full"
        >
          <option>Motivational</option>
          <option>Sad</option>
          <option>Realization</option>
          <option>Gratitude</option>
        </select>

        <input
          defaultValue={lesson?.image}
          name="image"
          className="input input-bordered w-full"
        />

        <select
          defaultValue={lesson?.visibility}
          name="visibility"
          className="select select-bordered w-full"
        >
          <option>Public</option>
          <option>Private</option>
        </select>

        <select
          defaultValue={lesson?.isPremium ? "Premium" : "Free"}
          name="access"
          disabled={user?.role !== "premium"}
          className="select select-bordered w-full"
        >
          <option>Free</option>
          <option>Premium</option>
        </select>
        {user?.role !== "premium" && (
          <p className="text-red-500 text-sm">
            Upgrade to Premium to use Premium Access.
          </p>
        )}

        <button className="btn btn-primary w-full">Update Lesson</button>
      </form>
    </div>
  );
}
