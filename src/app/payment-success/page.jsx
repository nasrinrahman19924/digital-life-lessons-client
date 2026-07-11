"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { UserContext } from "@/providers/UserProvider";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const session_id = searchParams.get("session_id");

  const { refreshUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!session_id) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
          {
            params: {
              session_id,
            },
          },
        );

        if (res.data.success) {
          await refreshUser();

          window.location.href = "/dashboard/profile";
          setSuccess(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Verifying Payment...</h2>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-red-600 text-2xl font-bold">
          Payment Verification Failed
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-5">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg">
        <CheckCircle className="mx-auto text-green-600" size={80} />

        <h1 className="text-4xl font-bold mt-6">Payment Successful 🎉</h1>

        <p className="mt-4 text-gray-600">
          Congratulations!
          <br />
          Your account is now Premium.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/">
            <button className="btn btn-outline">Home</button>
          </Link>

          <Link href="/dashboard/profile">
            <button className="btn btn-primary">My Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
