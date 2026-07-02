"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain one lowercase letter.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo || "",
      callbackURL: "/",
    });
    if (!error) {
      await fetch("http://localhost:5000/api/users/default-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
    };

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Registration Successful 🎉");

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-violet-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl">
        <CardBody className="p-8">
          <div className="mb-8 text-center">
            <Image
              src="/logo.png"
              width={70}
              height={70}
              alt="logo"
              className="mx-auto"
            />

            <h1 className="mt-4 text-3xl font-bold">Create Account</h1>

            <p className="text-default-500">Join Digital Life Lessons</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Photo URL
              </label>

              <input
                type="text"
                name="photo"
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" color="primary" className="w-full" size="lg">
              Create Account
            </Button>

            <Button
              type="button"
              variant="bordered"
              className="w-full"
              onPress={async () => {
                const { error } = await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "http://localhost:3000/",
                });

                if (error) {
                  toast.error(error.message);
                }
              }}
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-6 text-center">
            Already have an account?
            <Link href="/login" className="ml-2 font-semibold text-primary">
              Login
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
