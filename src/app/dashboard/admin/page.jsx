"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";

export default function AdminDashboard() {
  const { data = {} } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`,
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Users" value={data.users} />
        <Card title="Total Lessons" value={data.lessons} />
        <Card title="Public Lessons" value={data.publicLessons} />
        <Card title="Premium Lessons" value={data.premiumLessons} />
        <Card title="Reports" value={data.reports} />
        <Card title="Featured" value={data.featured} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-5 rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value || 0}</p>
    </div>
  );
}
