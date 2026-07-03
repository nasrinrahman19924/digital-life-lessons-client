import { Toaster } from "react-hot-toast";
import "./globals.css";
import UserProviders from "@/providers/UserProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProviders>{children}</UserProviders>
         <Toaster position="top-center" />
      </body>
    </html>
  );
}