"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Spinner,
} from "@heroui/react";

import { BookOpenText, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; // 🚨 সরাসরি authClient ইম্পোর্ট

export default function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  console.log("SESSION =", session);
  console.log("PENDING =", isPending);

  const [dbUser, setDbUser] = useState(null);
  const { userInfo } = useContext(UserContext);

  const user = session?.user;
  const isLoggedIn = !!session;

  useEffect(() => {
    if (!user?.email) {
      setDbUser(null);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDbUser(data);
      })
      .catch(console.error);
  }, [user]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Public Lessons", href: "/lessons" },
  ];

  if (isLoggedIn) {
    navLinks.push(
      { label: "Add Lesson", href: "/dashboard/add-lesson" },
      { label: "My Lessons", href: "/dashboard/my-lessons" },
    );

    if (dbUser && !dbUser.isPremium && dbUser.role !== "admin") {
      navLinks.push({ label: "Upgrade", href: "/pricing" });
    }
  }

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Logout Successfully");
    setIsMenuOpen(false);

    window.location.href = "/";
  };

  // 🚨 লোকাল ইমেজ বা এরর ইমেজ ফিল্টার করার ফাংশন
  const getSafeAvatarSrc = (imgUrl) => {
    if (
      !imgUrl ||
      imgUrl.trim() === "" ||
      imgUrl.startsWith("/users/") ||
      imgUrl.startsWith("/lessons/")
    ) {
      return undefined; // এই ইমেজগুলো এরর জেনারেট করলে তা এভয়েড করবে
    }
    return imgUrl;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <BookOpenText size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Digital Life Lessons</h2>
            <p className="text-xs text-zinc-500">Learn • Reflect • Grow</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-indigo-600"
                  : "text-zinc-600 hover:text-indigo-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <Spinner size="sm" color="primary" />
          ) : !isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <Button variant="light">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button color="primary">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex cursor-pointer items-center gap-3">
                  <div className="hidden text-right md:block">
                    <p className="font-semibold">{user?.name || "User"}</p>
                    <p className="text-xs text-zinc-500">
                      {dbUser?.role === "admin"
                        ? "🛡️ Administrator"
                        : dbUser?.isPremium
                          ? "⭐ Premium User"
                          : "Free User"}
                    </p>
                  </div>
                  {/* 🚨 ইমেজ সেফগার্ড সহ অবতার */}
                  <Avatar
                    src={getSafeAvatarSrc(user?.image)}
                    name={user?.name || "U"}
                    size="md"
                    showFallback
                  />
                </div>
              </DropdownTrigger>

              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="info" textValue="User Info">
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-zinc-500">{user?.email}</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="dashboard" as={Link} href="/dashboard">
                  Dashboard
                </DropdownItem>
                <DropdownItem key="profile" as={Link} href="/dashboard/profile">
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
