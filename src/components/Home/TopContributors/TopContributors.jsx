"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Award, BookOpen, Heart } from "lucide-react";

const contributors = [
  {
    id: 1,
    name: "Shahin Rahman",
    image: "/users/user1.jpg",
    lessons: 18,
    likes: 524,
    badge: "🥇 #1",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    image: "/users/user2.jpg",
    lessons: 15,
    likes: 460,
    badge: "🥈 #2",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    image: "/users/user3.jpg",
    lessons: 12,
    likes: 389,
    badge: "🥉 #3",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    image: "/users/user4.jpg",
    lessons: 10,
    likes: 301,
    badge: "#4",
  },
];

export default function TopContributors() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
            Community Leaders
          </span>

          <h2 className="text-4xl font-bold mt-5">
            Top Contributors of the Week
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-slate-600">
            Meet our most active members who inspire thousands by sharing
            valuable life experiences every week.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contributors.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex justify-center">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={90}
                  height={90}
                  className="rounded-full border-4 border-indigo-100"
                />
              </div>

              <div className="text-center mt-5">
                <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  {user.badge}
                </span>

                <h3 className="mt-4 text-xl font-bold">{user.name}</h3>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={18} />
                    Lessons
                  </span>

                  <span className="font-bold">{user.lessons}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Heart size={18} />
                    Likes
                  </span>

                  <span className="font-bold">{user.likes}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Award size={18} />
                    Status
                  </span>

                  <span className="font-semibold text-indigo-600">Active</span>
                </div>
              </div>

              <Button
                as={Link}
                href={`/profile/${user.id}`}
                color="primary"
                radius="full"
                className="mt-8 w-full"
              >
                View Profile
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
