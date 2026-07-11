"use client";

import Swal from "sweetalert2";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ReportButton({ lesson }) {
  const { data } = authClient.useSession();

  const handleReport = async () => {
    if (!data?.user) {
      return toast.error("Please login first");
    }

    const result = await Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        Spam: "Spam",
        Offensive: "Offensive",
        Copyright: "Copyright",
        Other: "Other",
      },
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/report`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: lesson._id,
          email: data.user.email,
          reason: result.value,
        }),
      },
    );

    const response = await res.json();

    if (response.insertedId) {
      toast.success("Lesson Reported");
    } else {
      toast.error(response.message || "Already Reported");
    }
  };

  return (
    <Button color="warning" onPress={handleReport}>
      Report Lesson
    </Button>
  );
}
