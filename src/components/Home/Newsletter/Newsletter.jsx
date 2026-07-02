"use client";

import { Button, Input } from "@heroui/react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[35px] bg-white p-12 shadow-xl"
        >
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
              <Mail size={36} className="text-indigo-600" />
            </div>

            <h2 className="mt-8 text-4xl font-bold">Join Our Newsletter</h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Receive inspiring life lessons, productivity tips, community
              updates and exclusive premium content directly in your inbox.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row">
            <Input
              size="lg"
              type="email"
              placeholder="Enter your email address"
            />

            <Button color="primary" size="lg">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
