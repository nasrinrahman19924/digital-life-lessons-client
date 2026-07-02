"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";

import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { BookOpenText, Crown } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Better Auth Session
  const { data, isPending } = authClient.useSession();

  const user = data?.user;
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

    if (!user?.isPremium) {
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

  if (isPending) {
    return null;
  }

  return (
    <Navbar
      maxWidth="xl"
      isBordered
      shouldHideOnScroll
      className="bg-white/80 backdrop-blur-xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Logo */}
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <BookOpenText size={22} />
          </div>

          <div>
            <h2 className="font-bold text-lg">Digital Life Lessons</h2>

            <p className="text-xs text-default-500">Learn • Reflect • Grow</p>
          </div>
        </Link>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent justify="center" className="hidden lg:flex gap-6">
        {navLinks.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-indigo-600"
                  : "text-default-600 hover:text-indigo-600"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right */}
      <NavbarContent justify="end">
        {!isLoggedIn ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Button as={Link} href="/login" variant="light">
                Login
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} href="/register" color="primary">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                src={user?.image || "/default-user.png"}
                className="cursor-pointer"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="User Menu">
              <DropdownItem
                key="profile-info"
                textValue="Profile"
                className="h-14"
              >
                <div>
                  <p className="font-semibold">{user?.name}</p>

                  {user?.isPremium ? (
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <Crown size={13} />
                      Premium
                    </span>
                  ) : (
                    <span className="text-xs text-default-500">Free Plan</span>
                  )}
                </div>
              </DropdownItem>

              <DropdownItem
                key="dashboard"
                onPress={() => router.push("/dashboard")}
              >
                Dashboard
              </DropdownItem>

              <DropdownItem
                key="profile"
                onPress={() => router.push("/dashboard/profile")}
              >
                Profile
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {navLinks.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className={`block w-full py-2 ${
                pathname === item.href ? "font-semibold text-indigo-600" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {!isLoggedIn && (
          <>
            <NavbarMenuItem>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
