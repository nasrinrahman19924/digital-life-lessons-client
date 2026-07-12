"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLessons = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/lessons`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      setLessons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lesson?",
      text: "This lesson will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/lessons/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Lesson Deleted Successfully");
      loadLessons();
    }
  };

  const handleFeatured = async (id, status) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/featured/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFeatured: status,
        }),
      },
    );

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success(
        status ? "Lesson marked as Featured" : "Lesson removed from Featured",
      );

      loadLessons();
    }
  };

  const handleReviewed = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/review/${id}`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Lesson Reviewed Successfully");
      loadLessons();
    }
  };

  const filtered = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchVisibility = filter === "All" || lesson.visibility === filter;

      const matchSearch = lesson.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchVisibility && matchSearch;
    });
  }, [lessons, filter, search]);

  const totalLessons = lessons.length;
  const publicLessons = lessons.filter((l) => l.visibility === "Public").length;

  const privateLessons = lessons.filter(
    (l) => l.visibility === "Private",
  ).length;

  const featuredLessons = lessons.filter((l) => l.isFeatured).length;

  const premiumLessons = lessons.filter((l) => l.isPremium).length;

  const reportedLessons = lessons.filter(
    (l) => (l.reportCount || 0) > 0,
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Lessons</h1>
          <p className="text-gray-500 mt-1">
            Total Lessons :{" "}
            <span className="font-semibold">{totalLessons}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by lesson title..."
            className="input input-bordered w-full sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="rounded-2xl bg-white shadow p-5 border">
          <p className="text-gray-500 text-sm">Total</p>
          <h2 className="text-4xl font-bold mt-2">{totalLessons}</h2>
        </div>

        <div className="rounded-2xl bg-green-50 shadow p-5 border border-green-200">
          <p className="text-green-700 text-sm">Public</p>
          <h2 className="text-4xl font-bold text-green-700 mt-2">
            {publicLessons}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-50 shadow p-5 border border-yellow-200">
          <p className="text-yellow-700 text-sm">Private</p>
          <h2 className="text-4xl font-bold text-yellow-700 mt-2">
            {privateLessons}
          </h2>
        </div>

        <div className="rounded-2xl bg-indigo-50 shadow p-5 border border-indigo-200">
          <p className="text-indigo-700 text-sm">Featured</p>
          <h2 className="text-4xl font-bold text-indigo-700 mt-2">
            {featuredLessons}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-50 shadow p-5 border border-red-200">
          <p className="text-red-700 text-sm">Premium</p>
          <h2 className="text-4xl font-bold text-red-700 mt-2">
            {premiumLessons}
          </h2>
        </div>

        <div className="rounded-2xl bg-orange-50 shadow p-5 border border-orange-200">
          <p className="text-orange-700 text-sm">Reported</p>
          <h2 className="text-4xl font-bold text-orange-700 mt-2">
            {reportedLessons}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow border">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Lesson</th>

              <th>Author</th>

              <th>Category</th>

              <th>Visibility</th>

              <th>Featured</th>

              <th>Reviewed</th>

              <th>Premium</th>

              <th>Reports</th>

              <th>Created</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((lesson) => (
                <tr key={lesson._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          lesson.image?.startsWith("http")
                            ? lesson.image
                            : "/lesson-placeholder.jpg"
                        }
                        alt={lesson.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover h-14 w-16"
                      />

                      <div>
                        <h2 className="font-semibold">{lesson.title}</h2>

                        <p className="text-xs text-gray-500">
                          {lesson.emotion}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{lesson.authorName}</td>

                  <td>{lesson.category}</td>

                  <td>
                    <span
                      className={`badge ${
                        lesson.visibility === "Public"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {lesson.visibility}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        lesson.isFeatured ? "badge-primary" : "badge-outline"
                      }`}
                    >
                      {lesson.isFeatured ? "Featured" : "No"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        lesson.reviewed ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {lesson.reviewed ? "Reviewed" : "Pending"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        lesson.isPremium ? "badge-error" : "badge-info"
                      }`}
                    >
                      {lesson.isPremium ? "Premium" : "Free"}
                    </span>
                  </td>

                  <td>{lesson.reportCount || 0}</td>

                  <td>
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleFeatured(lesson._id, !lesson.isFeatured)
                        }
                        className={`btn btn-xs ${
                          lesson.isFeatured ? "btn-warning" : "btn-success"
                        }`}
                      >
                        {lesson.isFeatured ? "Unfeature" : "Feature"}
                      </button>

                      {lesson.reviewed ? (
                        <button className="btn btn-xs btn-disabled" disabled>
                          Reviewed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReviewed(lesson._id)}
                          className="btn btn-xs btn-info"
                        >
                          Review
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>
                  <div className="flex flex-col items-center justify-center py-16">
                    <h2 className="text-2xl font-bold">No Lessons Found</h2>

                    <p className="text-gray-500 mt-2">
                      There are no lessons matching your filter.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
