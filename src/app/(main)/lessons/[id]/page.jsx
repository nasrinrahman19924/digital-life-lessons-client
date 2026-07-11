"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";

import FavoriteButton from "@/components/Lessons/FavoriteButton";
import LikeButton from "@/components/Lessons/LikeButton";
import ReportButton from "@/components/Lessons/ReportButton";
import CommentSection from "@/components/Lessons/CommentSection";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import {
  Button,
} from "@heroui/react";

import toast from "react-hot-toast";
import Link from "next/link";

export default function LessonDetailsPage({ params }) {
  const { id } = use(params);
  const { data } = authClient.useSession();

  const user = data?.user;

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/single/${id}`,
      );

      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!lesson) {
    return <div className="py-40 text-center">Lesson Not Found</div>;
  }
  if (lesson.isPremium && !user?.isPremium) {
    return (
      <div className="max-w-3xl mx-auto py-32 text-center">
        <h1 className="text-4xl font-bold mb-5">Premium Lesson</h1>

        <p className="mb-8">Upgrade your account to access this lesson.</p>

        <Link href="/pricing">
          <Button color="warning">Upgrade Now</Button>
        </Link>
      </div>
    );
  }
  const handleReport = async (reason) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: lesson._id,
          email: user.email,
          reason,
        }),
      },
    );

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Lesson Reported");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Banner */}

      <Image
        src={lesson.image || "/lesson-placeholder.jpg"}
        alt={lesson.title}
        width={1200}
        height={600}
        className="rounded-xl h-[450px] w-full object-cover"
      />

      {/* Lesson Info */}

      <div className="mt-8 space-y-4">
        <h1 className="text-4xl font-bold">{lesson.title}</h1>

        <p className="text-gray-600">{lesson.description}</p>
      </div>

      {/* Metadata */}

      <div className="grid md:grid-cols-4 gap-5 mt-10">
        <div className="border rounded-xl p-5">
          <h4 className="font-semibold">Category</h4>

          <p>{lesson.category}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h4 className="font-semibold">Access</h4>

          <p>{lesson.isPremium ? "Premium" : "Free"}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h4 className="font-semibold">Visibility</h4>

          <p>{lesson.visibility}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h4 className="font-semibold">Published</h4>

          <p>
            {lesson.createdAt
              ? new Date(lesson.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Author */}

      <div className="border rounded-xl mt-10 p-6 flex items-center gap-5">
        <Image
          src={lesson.authorImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
          width={70}
          height={70}
          alt="author"
          className="rounded-full"
        />

        <div>
          <h3 className="font-bold text-xl">{lesson.authorName}</h3>

          <p>{lesson.authorEmail}</p>
        </div>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <div className="border rounded-xl p-5">
          <h3 className="font-bold">Likes</h3>

          <p className="text-3xl">{lesson.likes || 0}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold">Favorites</h3>

          <p className="text-3xl">{lesson.saved || 0}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold">Reports</h3>

          <p className="text-3xl">{lesson.reportCount || 0}</p>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-5 mt-10 flex-wrap">
        <FavoriteButton lesson={lesson} />

        <LikeButton lesson={lesson} />

        <ReportButton lesson={lesson} />
      </div>

      {/* Comments */}

      <div className="mt-16">
        <CommentSection lessonId={lesson._id} />
      </div>
    </div>
  );
}
