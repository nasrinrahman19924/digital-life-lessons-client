"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { Heart, Bookmark } from "lucide-react";

export default function LessonCard({ lesson }) {
  const isPremium = lesson?.isPremium;

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow hover:shadow-xl transition duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={
            lesson?.image ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
          }
          alt={lesson?.title}
          fill
          className={`object-cover transition duration-500 group-hover:scale-110 ${
            isPremium ? "blur-sm" : ""
          }`}
        />

        {isPremium && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Link href="/pricing">
              <Button color="warning">Upgrade to Premium</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <Chip color="primary" variant="flat">
            {lesson?.category}
          </Chip>

          <Chip color={isPremium ? "warning" : "success"} variant="flat">
            {isPremium ? "Premium" : "Free"}
          </Chip>
        </div>

        <h2 className="text-xl font-bold line-clamp-2">{lesson?.title}</h2>

        <p className="text-sm text-default-500 line-clamp-3">
          {lesson?.description}
        </p>

        <div className="flex gap-2">
          <Chip size="sm" color="secondary">
            {lesson.visibility || "Public"}
          </Chip>

          {lesson.isFeatured && (
            <Chip size="sm" color="danger">
              Featured
            </Chip>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <Image
            src={lesson?.authorImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
            width={45}
            height={45}
            className="rounded-full"
            alt={lesson?.authorName || "Author"}
          />

          <div>
            <p className="font-semibold">{lesson?.authorName || "Unknown"}</p>

            <p className="text-xs text-default-500">
              {lesson?.createdAt
                ? new Date(lesson.createdAt).toLocaleDateString()
                : "No Date"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex gap-5 text-default-500 text-sm">
            <span className="flex items-center gap-1">
              <Heart size={17} />
              {lesson?.likes || 0}
            </span>

            <span className="flex items-center gap-1">
              <Bookmark size={17} />
              {lesson?.saved || 0}
            </span>
          </div>

          <Button
            as={Link}
            href={`/lessons/${lesson._id}`}
            color="primary"
            radius="full"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
