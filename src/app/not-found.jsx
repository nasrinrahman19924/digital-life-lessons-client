"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-indigo-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>

        <p className="mt-4 text-gray-500">
          Sorry! The page you are looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
