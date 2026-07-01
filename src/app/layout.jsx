import "./globals.css";
import Providers from "@/providers/Providers";

export const metadata = {
  title: "Digital Life Lessons",
  description: "Share Your Life Lessons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}