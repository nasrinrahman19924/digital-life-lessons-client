"use client";

import { authClient } from "@/lib/auth-client";

export default function CheckoutPage() {
  const { data } = authClient.useSession();

  const handleCheckout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: data.user.email,
        }),
      },
    );

    const session = await res.json();

    window.location.href = session.url;
  };

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold">Premium Upgrade</h1>

      <p className="mt-4">Unlock all premium lessons.</p>

      <button className="btn btn-primary mt-8" onClick={handleCheckout}>
        Pay ৳1500
      </button>
    </div>
  );
}
