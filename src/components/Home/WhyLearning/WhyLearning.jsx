"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Users, Sparkles } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Preserve Your Wisdom",
    description:
      "Capture valuable life experiences before they fade and build your personal library of wisdom.",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Grow Through Reflection",
    description:
      "Reflecting on past experiences helps improve decision-making and personal growth.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Inspire Others",
    description:
      "Your lessons may encourage and guide someone facing similar challenges.",
    icon: Users,
  },
  {
    id: 4,
    title: "Build Better Habits",
    description:
      "Transform your daily reflections into long-lasting habits that shape a better future.",
    icon: Sparkles,
  },
];

export default function WhyLearning() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-14 text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Why It Matters
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Why Learning From Life Matters
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Every experience teaches something valuable. Recording, revisiting,
            and sharing those lessons helps you grow while inspiring others on
            their journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                  <Icon size={30} className="text-indigo-600" />
                </div>

                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>

                <p className="leading-8 text-slate-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
