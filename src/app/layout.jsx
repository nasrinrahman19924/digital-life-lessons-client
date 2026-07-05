import "./globals.css";
import { Toaster } from "react-hot-toast";

import QueryProvider from "@/providers/QueryProvider";
import UserProvider from "@/providers/UserProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </QueryProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}