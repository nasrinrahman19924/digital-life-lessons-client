"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LessonCard from "../Home/FeaturedLessons/LessonCard";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

export default function PublicLessons() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["public-lessons", page, search, category],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/public`,
        {
          params: {
            page,
            limit: 6,
            search,
            category,
          },
        },
      );

      return res.data;
    },
  });

  const lessons = data?.lessons || [];
  const totalPages = data?.totalPages || 1;

  // ✅ Global Loading Spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="border p-2 rounded-lg w-full"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 rounded-lg"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Life">Life</option>
          <option value="Career">Career</option>
          <option value="Education">Education</option>
          <option value="Business">Business</option>
          <option value="Relationship">Relationship</option>
        </select>
      </div>

      {/* Empty State */}
      {lessons.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">No Lessons Found</h2>
          <p className="text-gray-500 mt-2">Try another search or category.</p>
        </div>
      ) : (
        <>
          {/* Lessons */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              className="btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
