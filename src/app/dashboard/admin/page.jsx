"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Flag, Star } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    lessons: 0,
    reports: 0,
    featured: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Public Lessons",
      value: stats.lessons,
      icon: <BookOpen size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Reported Lessons",
      value: stats.reports,
      icon: <Flag size={30} />,
      color: "bg-red-500",
    },
    {
      title: "Featured Lessons",
      value: stats.featured,
      icon: <Star size={30} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow p-6">
            <div
              className={`${card.color} text-white w-14 h-14 rounded-xl flex items-center justify-center`}
            >
              {card.icon}
            </div>

            <h2 className="mt-5 text-4xl font-bold">{card.value}</h2>

            <p className="text-gray-500 mt-2">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>

        <ul className="space-y-3">
          <li>✅ Total Users : {stats.users}</li>

          <li>✅ Public Lessons : {stats.lessons}</li>

          <li>✅ Reported Lessons : {stats.reports}</li>

          <li>✅ Featured Lessons : {stats.featured}</li>
        </ul>
      </div>
    </div>
  );
}
