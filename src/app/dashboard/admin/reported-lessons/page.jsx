"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports`,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
  });
  const handleDelete = async (lessonId) => {
    const result = await Swal.fire({
      title: "Delete this lesson?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/report/delete/${lessonId}`,
      {
        withCredentials: true,
      },
    );

    if (res.data.deletedCount) {
      toast.success("Lesson Deleted");
      refetch();
    }
  };
  const handleIgnore = async (reportId) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/report/ignore/${reportId}`,
      {
        withCredentials: true,
      },
    );

    if (res.data.deletedCount) {
      toast.success("Report Ignored");
      refetch();
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reported Lessons</h1>

      <div className="space-y-4">
        {data.map((report) => (
          <div
            key={report._id}
            className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
          >
            <div className="flex gap-4">
              <img
                src={report.lesson?.image}
                alt=""
                className="w-24 h-20 rounded object-cover"
              />

              <div>
                <h2 className="font-bold text-lg">{report.lesson?.title}</h2>

                <p>
                  <b>Reporter:</b> {report.email}
                </p>

                <p>
                  <b>Reason:</b> {report.reason}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(report.lesson._id)}
                className="btn btn-error"
              >
                Delete Lesson
              </button>

              <button
                onClick={() => handleIgnore(report._id)}
                className="btn btn-success"
              >
                Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
