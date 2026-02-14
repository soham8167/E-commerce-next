"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is on login page
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    // Check for token in localStorage
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [pathname, router]);

  // Show nothing while checking auth
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authorized
  if (!isAuthorized) {
    return null;
  }

  return <div className="min-h-screen">{children}</div>;
}
