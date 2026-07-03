"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Login Successful");

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-violet-100 p-6">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Digital Life Lessons"
              width={80}
              height={80}
              priority
              className="mx-auto"
            />

            <h1 className="text-3xl font-bold mt-4">Welcome Back 👋</h1>

            <p className="text-gray-500 mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-semibold">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" color="primary" className="w-full" size="lg">
              Login
            </Button>

            <Button
              type="button"
              variant="bordered"
              className="w-full"
              onPress={async () => {
                const { error } = await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "https://digital-life-lessons-client-b987.vercel.app",
                });

                if (error) {
                  toast.error(error.message);
                }
              }}
            >
              Continue with Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm">
            Don't have an account?
            <Link
              href="/register"
              className="ml-2 font-semibold text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
