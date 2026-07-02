"use client";

import { motion } from "framer-motion";
import SavedLessonCard from "./SavedLessonCard";

const lessons = [
  {
    _id: 1,
    title: "Never Give Up After Failure",
    description:
      "Failure is not the end. Every mistake teaches something valuable for your future journey.",

    image: "/lessons/lesson1.jpg",

    category: "Mindset",

    accessLevel: "Free",

    likes: 1340,

    saved: 720,

    views: 5900,

    date: "20 July 2026",

    creator: {
      name: "Shahin Rahman",
      photo: "/users/user1.jpg",
    },
  },

  {
    _id: 2,
    title: "Consistency Beats Motivation",

    description:
      "Motivation disappears quickly, but consistent habits change lives.",

    image: "/lessons/lesson2.jpg",

    category: "Personal Growth",

    accessLevel: "Premium",

    likes: 950,

    saved: 650,

    views: 4800,

    date: "18 July 2026",

    creator: {
      name: "Sarah Ahmed",
      photo: "/users/user2.jpg",
    },
  },

  {
    _id: 3,
    title: "Choose Peace Over Ego",

    description:
      "Protecting your peace is more valuable than winning unnecessary arguments.",

    image: "/lessons/lesson3.jpg",

    category: "Relationships",

    accessLevel: "Free",

    likes: 1180,

    saved: 610,

    views: 5300,

    date: "15 July 2026",

    creator: {
      name: "Tanvir Hasan",
      photo: "/users/user3.jpg",
    },
  },
];

export default function MostSavedLessons() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Community Favorites
          </span>

          <h2 className="mt-5 text-4xl font-bold">Most Saved Lessons</h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover the most bookmarked life lessons loved by our community.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <SavedLessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </div>
    </section>
  );
}
