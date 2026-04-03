"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  // Show a simplified or loading state if needed, but for header we usually just show nothing until ready
  if (status === "loading") {
    return <div style={{ width: 80 }} />; // placeholder to prevent layout shift
  }

  const profileHref = session ? "/profile" : "/auth/login";

  return (
    <>
      {session?.user && (
        <Link href="/dashboard" className={styles.dashboardLink}>
          {session.user.role === "seller" ? "Seller Dashboard" : "Dashboard"}
        </Link>
      )}

      <Link
        href={profileHref}
        className={styles.iconBtn}
        aria-label={session ? "User profile" : "Sign in"}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx={12} cy={8} r={4} />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </Link>
    </>
  );
}
