import "./globals.css";


import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
