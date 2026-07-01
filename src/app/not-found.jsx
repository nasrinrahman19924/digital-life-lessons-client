import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-8xl font-bold">404</h1>

      <p>Page Not Found</p>

      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
      >
        Back Home
      </Link>
    </div>
  );
}