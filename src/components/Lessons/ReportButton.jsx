"use client";

import Swal from "sweetalert2";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function ReportButton({ lesson }) {
  const handleReport = async () => {
    const result = await Swal.fire({
      title: "Report Lesson?",
      text: "Reason?",
      input: "select",
      inputOptions: {
        Spam: "Spam",
        Offensive: "Offensive",
        Copyright: "Copyright",
      },
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lessons/report/${lesson._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: result.value,
        }),
      },
    );

    toast.success("Lesson Reported");
  };

  return (
    <Button color="warning" onClick={handleReport}>
      Report Lesson
    </Button>
  );
}
