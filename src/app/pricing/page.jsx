"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function PricingPage() {
  const { data } = authClient.useSession();

  const user = data?.user;
  const handleCheckout = async () => {
    const res = await fetch(
      "https://digital-life-lessons-server-blush.vercel.app/api/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      },
    );

    const data = await res.json();

    window.location.href = data.url;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold">Please Login First</h2>
      </div>
    );
  }

  if (user.isPremium) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-5xl mb-4">⭐</h1>

          <h2 className="text-3xl font-bold">You are already a Premium User</h2>

          <Link href="/" className="btn btn-primary mt-6">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-5">
      <h1 className="text-5xl font-bold text-center">Upgrade to Premium</h1>

      <p className="text-center mt-4 text-gray-500">Lifetime Premium Access</p>

      <div className="overflow-x-auto mt-12">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Features</th>

              <th>Free</th>

              <th>Premium ⭐</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Create Lessons</td>
              <td>Unlimited Free</td>
              <td>Unlimited</td>
            </tr>

            <tr>
              <td>Create Premium Lessons</td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td>Access Premium Lessons</td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td>Priority Listing</td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td>Ad Free Experience</td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td>Verified Badge</td>
              <td>❌</td>
              <td>⭐</td>
            </tr>

            <tr>
              <td>Community Badge</td>
              <td>❌</td>
              <td>✅</td>
            </tr>

            <tr>
              <td>Lifetime Access</td>
              <td>❌</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-5xl font-bold mb-4">৳1500</h2>

        <p className="mb-8 text-gray-500">One Time Payment</p>

        <button onClick={handleCheckout} className="btn btn-primary btn-lg">
          Upgrade to Premium ⭐
        </button>
      </div>
    </div>
  );
}
