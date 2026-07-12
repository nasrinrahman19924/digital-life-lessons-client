"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Card, Spinner, Divider } from "@heroui/react";

import {
  Users,
  BookOpen,
  Globe,
  Lock,
  Crown,
  Star,
  Flag,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

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
      color: "text-blue-600",
    },
    {
      title: "Total Lessons",
      value: data.lessons,
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Public Lessons",
      value: data.publicLessons,
      icon: Globe,
      color: "text-emerald-600",
    },
    {
      title: "Private Lessons",
      value: data.privateLessons,
      icon: Lock,
      color: "text-orange-500",
    },
    {
      title: "Premium Lessons",
      value: data.premiumLessons,
      icon: Crown,
      color: "text-yellow-500",
    },
    {
      title: "Featured Lessons",
      value: data.featured,
      icon: Star,
      color: "text-purple-600",
    },
    {
      title: "Reported Lessons",
      value: data.reports,
      icon: Flag,
      color: "text-red-600",
    },
    {
      title: "Today's Lessons",
      value: data.todayLessons,
      icon: CalendarDays,
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="text-default-500 mt-2">
          Monitor users, lessons and platform activity.
        </p>
      </div>

      {/* Analytics Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-default-500 text-sm">{card.title}</p>

                  <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
                </div>

                <div className="rounded-full bg-default-100 p-4">
                  <Icon size={30} className={card.color} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Divider />
      {/* Charts */}

      <div className="grid gap-8 xl:grid-cols-2">
        {/* Lesson Growth */}

        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Lesson Growth</h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data.lessonGrowth}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="lessons"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* User Growth */}

        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">User Growth</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="users" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Divider />
      {/* Bottom Section */}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Contributors */}

        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">🏆 Top Contributors</h2>

          <div className="space-y-4">
            {data.contributors?.length > 0 ? (
              data.contributors.map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between rounded-xl border p-4 hover:bg-default-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold">{user.name}</h3>

                      <p className="text-sm text-default-500">
                        {user.totalLessons} Lessons
                      </p>
                    </div>
                  </div>

                  <Star className="text-yellow-500" />
                </div>
              ))
            ) : (
              <p className="text-default-500">No contributors found.</p>
            )}
          </div>
        </Card>

        {/* Latest Lessons */}

        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6">📝 Latest Lessons</h2>

          <div className="space-y-4">
            {data.latestLessons?.length > 0 ? (
              data.latestLessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="rounded-xl border p-4 hover:bg-default-100 transition"
                >
                  <h3 className="font-semibold">{lesson.title}</h3>

                  <p className="text-sm text-default-500 mt-1">
                    By {lesson.authorName}
                  </p>

                  <p className="text-xs text-default-400 mt-2">
                    {lesson.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-default-500">No recent lessons found.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
