"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.css";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.searchWrapper}>
      <svg
        className={styles.searchIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Search for handcrafted items..."
        value={query}
        onChange={handleChange}
        aria-label="Search products"
      />
    </div>
  );
}
