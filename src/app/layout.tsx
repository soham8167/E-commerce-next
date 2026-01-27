import "./globals.css";


import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/layout/ScrollTop";


export const metadata: Metadata = {
  title: "Fresh Produce - E-commerce",
  description: "Fresh vegetables, fruits, and more",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
