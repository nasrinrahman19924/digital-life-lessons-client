"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-5" />

        <h1 className="text-4xl font-bold mb-4">Payment Successful 🎉</h1>

        <p className="text-gray-600 mb-8">
          Thank you for purchasing Premium.
          <br />
          Your account will be upgraded shortly.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <button className="btn btn-outline">Go Home</button>
          </Link>

          <Link href="/dashboard/profile">
            <button className="btn btn-primary">My Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
