"use client";

import FeaturedLessons from "@/components/Home/FeaturedLessons/FeaturedLessons";

export default function LessonsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Public Lessons
      </h1>

      <FeaturedLessons />
    </div>
  );
}