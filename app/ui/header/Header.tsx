import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Handcrafted Haven
        </Link>

        <Suspense fallback={<div className={styles.searchPlaceholder} />}>
          <SearchBar />
        </Suspense>

        <nav className={styles.actions}>
          <Link
            href="/profile"
            className={styles.iconBtn}
            aria-label="User profile"
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
          <Link
            href="/cart"
            className={styles.iconBtn}
            aria-label="Shopping cart"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1={3} y1={6} x2={21} y2={6} />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
