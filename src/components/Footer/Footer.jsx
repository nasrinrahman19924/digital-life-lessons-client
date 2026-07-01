"use client";

import Link from "next/link";
import { BookOpenText, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-3 text-white">
                <BookOpenText size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Digital Life Lessons
                </h2>

                <p className="text-sm text-slate-400">Learn • Reflect • Grow</p>
              </div>
            </Link>

            <p className="mt-5 leading-7 text-slate-400">
              Preserve your experiences, share meaningful life lessons, and
              inspire people around the world through your wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/lessons"
                  className="hover:text-indigo-400 transition"
                >
                  Public Lessons
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="hover:text-indigo-400 transition"
                >
                  Upgrade
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Legal</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-indigo-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">Contact</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-400" />
                <span>support@digitallifelessons.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-400" />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-indigo-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaXTwitter />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-indigo-600"
              >
                <FaGithub />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-slate-500">
              © {year} Digital Life Lessons. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:text-indigo-400">
                Terms
              </Link>

              <Link href="/privacy" className="hover:text-indigo-400">
                Privacy
              </Link>

              <Link href="/contact" className="hover:text-indigo-400">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
