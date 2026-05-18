"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
  children
}: {
  children: React.ReactNode
}) {

  const router = useRouter();

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login");
    }

  }, []);

  return <>{children}</>;
}