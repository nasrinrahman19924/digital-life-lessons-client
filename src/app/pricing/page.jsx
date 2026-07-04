"use client";

import Link from "next/link";

export default function PricingPage() {
  const features = [
    ["Access to Free Lessons", "✅", "✅"],
    ["Access Premium Lessons", "❌", "✅"],
    ["Save Favorites", "✅", "✅"],
    ["Comment on Lessons", "✅", "✅"],
    ["Priority Support", "❌", "✅"],
    ["Premium Badge", "❌", "✅"],
    ["Exclusive Content", "❌", "✅"],
    ["Price", "Free", "৳1500"],
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <h1 className="text-5xl font-bold text-center mb-4">
        Upgrade to Premium
      </h1>

      <p className="text-center text-gray-500 mb-12">
        Compare Free vs Premium Plans
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Feature</th>

              <th>Free</th>

              <th>Premium</th>
            </tr>
          </thead>

          <tbody>
            {features.map((item, index) => (
              <tr key={index}>
                <td>{item[0]}</td>

                <td>{item[1]}</td>

                <td>{item[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-10">
        <Link href="/checkout">
          <button className="btn btn-primary btn-lg">
            Upgrade Now - ৳1500
          </button>
        </Link>
      </div>
    </div>
  );
}
