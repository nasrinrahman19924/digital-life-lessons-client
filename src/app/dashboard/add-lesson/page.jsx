"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddLessonPage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login first");
    }
    try {
      setLoading(true);

      const form = new FormData(e.target);

      const imageFile = form.get("image");

      // Upload image to IMGBB
      const imageForm = new FormData();
      imageForm.append("image", imageFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: imageForm,
        },
      );

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error("Image Upload Failed");
      }

      const imageUrl = uploadData.data.display_url;

      const lesson = {
        title: form.get("title"),
        category: form.get("category"),
        description: form.get("description"),

        image: imageUrl,

        authorName: user.name,
        authorEmail: user.email,
        authorImage: user.image,

        visibility: form.get("visibility"),

        isPremium: form.get("premium") === "yes",

        isFeatured: false,

        likes: 0,
        saved: 0,
        reportCount: 0,
        reviewed: false,

        createdAt: new Date(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lesson),
      });
      const result = await res.json();

      if (result.insertedId || result.acknowledged) {
        toast.success("Lesson Added Successfully 🎉");
        e.target.reset();
      } else {
        toast.error("Failed to add lesson");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Lesson</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-8 rounded-xl shadow"
      >
        <input
          name="title"
          required
          placeholder="Lesson Title"
          className="border p-3 rounded-lg w-full"
        />
        {/* Category */}
        <select
          name="category"
          required
          placeholder="Category"
          className="border p-3 select select-bordered rounded-lg w-full"
        >
          <option value="">Select Category</option>

          <option>Education</option>

          <option>Career</option>

          <option>Personal Growth</option>

          <option>Relationships</option>

          <option>Business</option>

          <option>Technology</option>

          <option>Motivation</option>

          <option>Life</option>
        </select>

        {/* Image */}
        <input
          name="image"
          type="file"
          accept="image/*"
          required
          placeholder="Upload Image URL"
          className="border p-3file-input file-input-bordered rounded-lg w-full"
        />

        {/* Visibility */}
        <select
          name="visibility"
          className="border p-3 select select-bordered rounded-lg w-full"
        >
          <option value="Public">Public</option>

          <option value="Private">Private</option>
        </select>
        {/* Premium */}
        <select
          name="premium"
          className="border p-3 select select-bordered rounded-lg w-full"
        >
          <option value="no">Free Lesson</option>

          <option value="yes">Premium Lesson</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          rows={8}
          required
          placeholder="Write your lesson..."
          className="border p-3 textarea textarea-bordered rounded-lg w-full"
        />

        {/* Button */}
        <button
          disabled={loading}
          className="btn btn-primary bg-indigo-700 font-bold text-white w-full"
        >
          {loading ? "Uploading..." : "Add Lesson"}
        </button>
      </form>
    </div>
  );
}
