"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Spinner } from "@heroui/react";
import { Users, BookOpen, Globe, Crown, Flag, Star } from "lucide-react";

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/analytics`,
        {
          withCredentials: true,
        },
      );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: data.users,
      icon: Users,
    },
    {
      title: "Total Lessons",
      value: data.lessons,
      icon: BookOpen,
    },
    {
      title: "Public Lessons",
      value: data.publicLessons,
      icon: Globe,
    },
    {
      title: "Premium Lessons",
      value: data.premiumLessons,
      icon: Crown,
    },
    {
      title: "Featured Lessons",
      value: data.featured,
      icon: Star,
    },
    {
      title: "Reported Lessons",
      value: data.reports,
      icon: Flag,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-default-500">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
                </div>

                <div className="bg-primary/10 p-4 rounded-full">
                  <Icon size={30} className="text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
