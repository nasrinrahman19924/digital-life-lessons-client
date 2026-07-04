"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ReportsPage() {
  const { data = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/reports`,
      );
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reported Lessons</h1>

      <div className="space-y-4">
        {data.map((r) => (
          <div key={r._id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold">{r.lesson?.title}</h2>
            <p className="text-sm">Reason: {r.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
