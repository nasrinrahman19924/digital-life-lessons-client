import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "@/providers/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
         <Toaster position="top-center" />
      </body>
    </html>
  );
}