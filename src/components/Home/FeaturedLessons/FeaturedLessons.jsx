"use client";

import { useEffect, useState } from "react";

export default function FeaturedLessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/lessons/featured/all")
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
        <div key={lesson._id} className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-xl">{lesson.title}</h2>

          <p>{lesson.category}</p>

          <p className="mt-3">{lesson.description.slice(0, 120)}...</p>
        </div>
      ))}
    </div>
  );
}
