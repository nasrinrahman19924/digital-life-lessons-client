"use client";

import { Button } from "@heroui/react";
import { Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function FavoriteButton({ lesson }) {
  const { data } = authClient.useSession();

  const handleFavorite = async () => {
    if (!data?.user) {
      return toast.error("Please login first");
    }

    const favorite = {
      lessonId: lesson._id,
      email: data.user.email,
      title: lesson.title,
      category: lesson.category,
      authorName: lesson.authorName,
      authorImage: lesson.authorImage,
      isPremium: lesson.isPremium,
      createdAt: new Date(),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
      },
    );

    const result = await res.json();

    if (result.insertedId) {
      toast.success("Added to Favorites");
    } else {
      toast(result.message || "Already Added");
    }
  };

  return (
    <Button
      color="danger"
      startContent={<Heart size={18} />}
      onPress={handleFavorite}
    >
      Save to Favorites
    </Button>
  );
}
