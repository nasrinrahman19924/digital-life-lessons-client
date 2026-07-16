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
import {
  Eye,
  EyeSlash,
  Person,
  At,
  ShieldKeyhole,
  Picture,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  // Form fields states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain one lowercase letter.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      setIsLoading(true);
      let imageURL = "";

      // Upload Image to IMGBB
      if (photo) {
        setUploading(true);

        const formData = new FormData();

        formData.append("image", photo);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          setUploading(false);
          setIsLoading(false);

          return toast.error("Image upload failed.");
        }

        imageURL = uploadData.data.display_url;

        setUploading(false);
      }

      const { error } = await signUp.email({
        name,
        email,
        password,
        image: imageURL,
        callbackURL: "/",
      });

      if (error) {
        return toast.error(error.message);
      }

      toast.success("Registration Successful 🎉");

      setName("");
      setEmail("");
      setPassword("");
      setPhoto(null);

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong.");
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-8">
      <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        {/* Header Container */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Create Account
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Join Digital Life Lessons
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* Name Field */}
          <TextField isRequired name="name" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </Label>
            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
              <Person className="text-zinc-400 pointer-events-none" size={16} />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          {/* Email Field */}
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
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          {/* Photo URL Field */}
          <TextField className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Profile Image</Label>

            <InputGroup className="flex items-center gap-2 border border-zinc-200 rounded-xl px-3 bg-zinc-50">
              <Picture size={16} />

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full bg-transparent py-2 text-sm border-none"
              />
            </InputGroup>
          </TextField>

          {/* Password Field */}
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
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
              />
              <button
                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </InputGroup>
          </TextField>

          {/* Action Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold rounded-xl text-sm h-12 mt-2"
            isLoading={isLoading || uploading}
            isDisabled={isLoading || uploading}
          >
            {uploading ? "Uploading Image..." : "Create Account"}
          </Button>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="bordered"
            className="w-full font-semibold rounded-xl text-sm h-12 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onPress={handleGoogleSignIn}
            isDisabled={isLoading || uploading}
          >
            Continue with Google
          </Button>

          {/* Navigation Option */}
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400 inline-block ml-1"
            >
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
