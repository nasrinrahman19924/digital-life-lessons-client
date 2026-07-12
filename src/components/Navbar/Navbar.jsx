"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";

import { BookOpenText, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const [dbUser, setDbUser] = useState(null);

  const { userInfo } = useContext(UserContext);

  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DB USER:", data);
        setDbUser(data);
      })
      .catch(console.error);
  }, [user]);

  if (isPending) return null;

  const isLoggedIn = !!user;

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Public Lessons",
      href: "/lessons",
    },
  ];

  if (isLoggedIn) {
    navLinks.push(
      {
        label: "Add Lesson",
        href: "/dashboard/add-lesson",
      },
      {
        label: "My Lessons",
        href: "/dashboard/my-lessons",
      },
    );

    if (dbUser && !dbUser.isPremium && dbUser.role !== "admin") {
      navLinks.push({
        label: "Upgrade",
        href: "/pricing",
      });
    }
  }

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Logout Successfully");
    router.push("/");
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
          {!isLoggedIn ? (
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
                    <p className="font-semibold">{user?.name}</p>

                    <p className="text-xs text-zinc-500">
                      {dbUser?.role === "admin"
                        ? "🛡️ Administrator"
                        : dbUser?.isPremium
                          ? "⭐ Premium User"
                          : "Free User"}
                    </p>
                  </div>

                  <Avatar src={user?.image} name={user?.name} size="md" />
                </div>
              </DropdownTrigger>

              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="info">
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
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <div className="flex flex-col px-4 py-4 gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-3 py-2 transition ${
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Button
                  as={Link}
                  href="/auth/login"
                  variant="light"
                  className="justify-start"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  href="/auth/register"
                  color="primary"
                  className="justify-start"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <div className="border-t pt-3 mt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar src={user?.image} name={user?.name} size="md" />

                    <div>
                      <p className="font-semibold">{user?.name}</p>

                      <p className="text-xs text-zinc-500">{user?.email}</p>

                      <p className="text-xs text-zinc-500">
                        {dbUser?.role === "admin"
                          ? "🛡️ Administrator"
                          : dbUser?.isPremium
                            ? "⭐ Premium User"
                            : "Free User"}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-zinc-100"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 hover:bg-zinc-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="mt-2 w-full rounded-lg bg-red-500 px-3 py-2 text-left text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
