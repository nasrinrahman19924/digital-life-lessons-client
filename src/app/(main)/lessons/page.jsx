"use client";

import PublicLessons from "@/components/Lessons/PublicLessons";

export default function LessonsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Public Lessons</h1>

      <PublicLessons />
    </div>
  );
}
