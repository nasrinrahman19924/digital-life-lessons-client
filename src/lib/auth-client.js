import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  // এটি ক্লায়েন্ট সাইডে সেশন চেঞ্জ হলে স্বয়ংক্রিয়ভাবে Next.js-এর রাউটার রিফ্রেশ করতে সাহায্য করে
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
