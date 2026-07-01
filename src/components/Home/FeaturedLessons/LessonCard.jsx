"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { Heart, Bookmark } from "lucide-react";

export default function LessonCard({ lesson }) {
  return (
    <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={lesson.image}
          alt={lesson.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <Chip color="primary" variant="flat">
            {lesson.category}
          </Chip>

          <Chip
            color={lesson.accessLevel === "Premium" ? "warning" : "success"}
            variant="flat"
          >
            {lesson.accessLevel}
          </Chip>
        </div>

        <h2 className="text-xl font-bold line-clamp-2">{lesson.title}</h2>

        <p className="text-sm text-default-500 line-clamp-3">
          {lesson.description}
        </p>

        <div className="flex items-center gap-3">
          <Image
            src={lesson.creator.photo}
            width={40}
            height={40}
            className="rounded-full"
            alt={lesson.creator.name}
          />

          <div>
            <p className="font-semibold">{lesson.creator.name}</p>

            <p className="text-xs text-default-500">{lesson.date}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex gap-5 text-sm text-default-500">
            <span className="flex items-center gap-1">
              <Heart size={17} />
              {lesson.likes}
            </span>

            <span className="flex items-center gap-1">
              <Bookmark size={17} />
              {lesson.saved}
            </span>
          </div>

          <Button
            as={Link}
            href={`/lessons/${lesson._id}`}
            color="primary"
            radius="full"
          >
            See Details
          </Button>
        </div>
      </div>
    </div>
  );
}
