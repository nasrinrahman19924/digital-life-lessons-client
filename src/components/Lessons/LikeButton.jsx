"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function LikeButton({ lesson }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/like/${lesson._id}`,
      {
        method: "PATCH",
      },
    );

    setLiked(!liked);

    toast.success(liked ? "Like Removed" : "Lesson Liked");
  };

  return (
    <Button color={liked ? "danger" : "primary"} onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </Button>
  );
}
