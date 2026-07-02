"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { Bookmark, Heart, Eye } from "lucide-react";

export default function SavedLessonCard({ lesson }) {
  return (
    <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={lesson.image}
          alt={lesson.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <Chip color="warning" className="absolute right-4 top-4">
          🔖 {lesson.saved} Saves
        </Chip>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex justify-between">
          <Chip color="primary" variant="flat">
            {lesson.category}
          </Chip>

          <Chip
            color={lesson.accessLevel === "Premium" ? "warning" : "success"}
          >
            {lesson.accessLevel}
          </Chip>
        </div>

        <h2 className="text-xl font-bold line-clamp-2">{lesson.title}</h2>

        <p className="text-default-500 line-clamp-3">{lesson.description}</p>

        <div className="flex items-center gap-3">
          <Image
            src={lesson.creator.photo}
            alt={lesson.creator.name}
            width={45}
            height={45}
            className="rounded-full"
          />

          <div>
            <h4 className="font-semibold">{lesson.creator.name}</h4>

            <p className="text-xs text-default-500">{lesson.date}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-4 text-sm text-default-500">
            <span className="flex items-center gap-1">
              <Heart size={17} />
              {lesson.likes}
            </span>

            <span className="flex items-center gap-1">
              <Eye size={17} />
              {lesson.views}
            </span>
          </div>

          <Button
            as={Link}
            href={`/lessons/${lesson._id}`}
            color="primary"
            radius="full"
          >
            Read
          </Button>
        </div>
      </div>
    </div>
  );
}
