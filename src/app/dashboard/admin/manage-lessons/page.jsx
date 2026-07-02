"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState("All");

  const loadLessons = () => {
    fetch("http://localhost:5000/api/admin/lessons")
      .then((res) => res.json())
      .then((data) => setLessons(data));
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lesson?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:5000/api/admin/lessons/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Lesson Deleted");
      loadLessons();
    }
  };

  const handleFeatured = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/featured/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Lesson Featured");
      loadLessons();
    }
  };

  const handleReviewed = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/review/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success("Lesson Reviewed");
      loadLessons();
    }
  };

  const filtered =
    filter === "All" ? lessons : lessons.filter((l) => l.visibility === filter);

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Lessons</h1>

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

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-4xl font-bold">
            {lessons.filter((l) => l.visibility === "Public").length}
          </h2>

          <p>Public Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-4xl font-bold">
            {lessons.filter((l) => l.visibility === "Private").length}
          </h2>

          <p>Private Lessons</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-4xl font-bold">
            {lessons.filter((l) => l.reportCount > 0).length}
          </h2>

          <p>Reported Lessons</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>

              <th>Author</th>

              <th>Category</th>

              <th>Visibility</th>

              <th>Featured</th>

              <th>Reviewed</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>

                <td>{lesson.name}</td>

                <td>{lesson.category}</td>

                <td>{lesson.visibility}</td>

                <td>{lesson.isFeatured ? "✅" : "❌"}</td>

                <td>{lesson.reviewed ? "✅" : "❌"}</td>

                <td>
                  <div className="flex gap-2">
                    {!lesson.isFeatured && (
                      <button
                        onClick={() => handleFeatured(lesson._id)}
                        className="btn btn-success btn-sm"
                      >
                        Feature
                      </button>
                    )}

                    {!lesson.reviewed && (
                      <button
                        onClick={() => handleReviewed(lesson._id)}
                        className="btn btn-info btn-sm"
                      >
                        Review
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
