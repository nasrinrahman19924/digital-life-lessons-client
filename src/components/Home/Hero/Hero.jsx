"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Every Life Lesson Has the Power to Inspire Someone",
    description:
      "Capture your experiences, preserve meaningful wisdom, and help others grow through your personal journey.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Discover Real Stories from Real People",
    description:
      "Explore authentic life lessons shared by a growing community of learners, dreamers, and achievers.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Reflect, Learn & Become Your Best Self",
    description:
      "Build your own collection of wisdom, save inspiring lessons, and unlock premium insights.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Hero() {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
        }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[88vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}

              <div className="absolute inset-0 bg-black/65" />

              {/* Content */}

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="max-w-3xl"
                >
                  <span className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                    Digital Life Lessons
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button
                      as={Link}
                      href="/lessons"
                      color="primary"
                      size="lg"
                      radius="full"
                    >
                      Explore Lessons
                    </Button>

                    <Button
                      as={Link}
                      href="/register"
                      variant="bordered"
                      radius="full"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Get Started
                    </Button>
                  </div>

                  {/* Stats */}

                  <div className="mt-12 grid max-w-xl grid-cols-3 gap-5">
                    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                      <h2 className="text-3xl font-bold text-white">1K+</h2>

                      <p className="mt-2 text-sm text-gray-300">Life Lessons</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                      <h2 className="text-3xl font-bold text-white">500+</h2>

                      <p className="mt-2 text-sm text-gray-300">Active Users</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
                      <h2 className="text-3xl font-bold text-white">98%</h2>

                      <p className="mt-2 text-sm text-gray-300">
                        Positive Reviews
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
