"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

import LessonCard from "./LessonCard";

const FeaturedLessons = () => {
  const { data: featuredLessons = [], isLoading } = useQuery({
    queryKey: ["featured-lessons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/featured/all`,
      );

      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Featured Life Lessons
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLessons.length > 0 ? (
            featuredLessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))
          ) : (
            <p>No featured lessons found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
