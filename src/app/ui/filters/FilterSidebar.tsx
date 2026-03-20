"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { categories, priceRanges } from "@/app/lib/data";
import styles from "./FilterSidebar.module.css";

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") ?? "All";
  const selectedPrice = searchParams.get("price") ?? "All Prices";

  function setFilter(key: string, value: string, defaultValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className={styles.sidebar}>
      {/* Categories */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Categories</h2>
        <ul className={styles.list}>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ""}`}
                onClick={() => setFilter("category", cat, "All")}
                aria-pressed={selectedCategory === cat}
              >
                {selectedCategory === cat && (
                  <span className={styles.dot} aria-hidden="true" />
                )}
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Price Range</h2>
        <ul className={styles.list}>
          {priceRanges.map((range) => (
            <li key={range.label}>
              <button
                className={`${styles.filterBtn} ${selectedPrice === range.label ? styles.active : ""}`}
                onClick={() => setFilter("price", range.label, "All Prices")}
                aria-pressed={selectedPrice === range.label}
              >
                {selectedPrice === range.label && (
                  <span className={styles.dot} aria-hidden="true" />
                )}
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
