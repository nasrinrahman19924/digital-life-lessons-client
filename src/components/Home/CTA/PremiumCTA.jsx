"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PremiumCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[35px] bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-12 text-center text-white"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <Crown size={40} />
          </div>

          <h2 className="mt-8 text-5xl font-extrabold">
            Unlock Premium Wisdom
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
            Access exclusive life lessons, publish premium content, enjoy
            priority visibility and inspire thousands with your experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Button
              as={Link}
              href="/pricing"
              size="lg"
              color="warning"
              radius="full"
              startContent={<Sparkles size={18} />}
            >
              Upgrade Now
            </Button>

            <Button
              as={Link}
              href="/lessons"
              size="lg"
              radius="full"
              variant="bordered"
              className="border-white text-white"
            >
              Explore Lessons
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="text-3xl font-bold">Unlimited</h3>
              <p className="mt-2 text-indigo-100">Premium Lessons</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="text-3xl font-bold">Lifetime</h3>
              <p className="mt-2 text-indigo-100">Premium Access</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="text-3xl font-bold">Priority</h3>
              <p className="mt-2 text-indigo-100">Public Visibility</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
