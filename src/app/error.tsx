"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Something went wrong!</h2>
      <p className={styles.message}>
        We apologize for the inconvenience. An unexpected error occurred while processing your request.
      </p>
      <div className={styles.actions}>
        <button className={styles.retryButton} onClick={() => reset()}>
          Try Again
        </button>
        <Link href="/" className={styles.homeButton}>
          Go Home
        </Link>
      </div>
    </main>
  );
}
