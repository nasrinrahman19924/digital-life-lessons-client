"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  User,
  PlusCircle,
  Users,
  Shield,
  Flag,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const pathname = usePathname();

  const { data } = authClient.useSession();

  const user = data?.user;

  // পরে Database থেকে role আনবে
  const isAdmin = user?.role === "admin";

  const userMenus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Lesson",
      href: "/dashboard/add-lesson",
      icon: PlusCircle,
    },
    {
      name: "My Lessons",
      href: "/dashboard/my-lessons",
      icon: BookOpen,
    },
    {
      name: "My Favorites",
      href: "/dashboard/my-favorites",
      icon: Heart,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const adminMenus = [
    {
      name: "Admin Home",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      name: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
      icon: Shield,
    },
    {
      name: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
      icon: Flag,
    },
    {
      name: "Admin Profile",
      href: "/dashboard/admin/profile",
      icon: User,
    },
  ];

  const menus = isAdmin ? adminMenus : userMenus;

  return (
    <aside className="w-72 min-h-screen bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8">Dashboard</h2>

      <div className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === menu.href
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-indigo-100"
              }`}
            >
              <Icon size={20} />
              {menu.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
