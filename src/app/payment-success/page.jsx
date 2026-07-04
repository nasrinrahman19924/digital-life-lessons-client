"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setMessage("Invalid payment session.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/verify?session_id=${sessionId}`,
        );

        const data = await res.json();

        if (data.success) {
          setMessage("🎉 Premium Activated Successfully!");

          // Refresh Better Auth session
          if (authClient.getSession) {
            await authClient.getSession();
          }
        } else {
          setMessage(data.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong.");
      }

      setLoading(false);
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10 text-center">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-5" />

        <h1 className="text-4xl font-bold mb-4">Payment Successful 🎉</h1>

        <p className="text-gray-600 mb-8">
          {loading ? "Verifying payment..." : message}
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
