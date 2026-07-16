"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required.");
    }

    if (!password) {
      return toast.error("Password is required.");
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        // signIn.email এর বদলে authClient.signIn.email
        email,
        password,
        callbackURL: "/",
        fetchOptions: {
          credentials: "include",
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login Successful 🎉");

        setEmail("");
        setPassword("");

        // সামান্য একটু সময় দিয়ে রিডাইরেক্ট
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
      fetchOptions: {
        credentials: "include",
      },
    });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-8">
      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Welcome Back
          </h1>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Login to your Digital Life Lessons account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </Label>

            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <At className="text-zinc-400 pointer-events-none" size={16} />

              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>

            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <ShieldKeyhole
                className="text-zinc-400 pointer-events-none"
                size={16}
              />

              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />

              <button
                type="button"
                onClick={toggleVisibility}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition"
              >
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </InputGroup>
          </TextField>

          {/* Login Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold rounded-xl text-sm h-12 mt-2"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Login
          </Button>

          {/* Google Login */}
          <Button
            type="button"
            variant="bordered"
            className="w-full font-semibold rounded-xl text-sm h-12 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onPress={handleGoogleSignIn}
            isDisabled={isLoading}
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            New to Digital Life?
            <Link
              href="/auth/register"
              className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400 inline-block ml-1"
            >
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
