"use client";

import { Button } from "@heroui/react";
import LessonCard from "./LessonCard";

const lessons = [
  {
    _id: 1,
    title: "Failure Taught Me More Than Success",
    description:
      "Every setback became an opportunity to grow stronger and wiser.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    category: "Mindset",
    accessLevel: "Free",
    likes: 234,
    saved: 118,
    date: "12 Jul 2026",

    creator: {
      name: "Shahin",
      photo: "https://i.pravatar.cc/150?img=5",
    },
  },

  {
    _id: 2,
    title: "The Power of Small Daily Habits",
    description:
      "Small consistent habits changed my entire life within one year.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
    category: "Personal Growth",
    accessLevel: "Premium",
    likes: 520,
    saved: 310,
    date: "18 Jul 2026",

    creator: {
      name: "Rahim",
      photo: "https://i.pravatar.cc/150?img=8",
    },
  },

  {
    _id: 3,
    title: "Don't Compare Your Journey",
    description:
      "Everyone has different timing. Focus on yourself and keep moving.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
    category: "Career",
    accessLevel: "Free",
    likes: 350,
    saved: 180,
    date: "25 Jul 2026",

    creator: {
      name: "Sadia",
      photo: "https://i.pravatar.cc/150?img=9",
    },
  },
];

export default function FeaturedLessons() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">⭐ Featured Life Lessons</h2>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Handpicked life lessons selected by our administrators to inspire,
            educate and motivate the community.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button color="primary" size="lg" radius="full">
            View All Lessons
          </Button>
        </div>
      </div>
    </section>
  );
}
