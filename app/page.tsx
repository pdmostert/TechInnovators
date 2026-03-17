import { Suspense } from "react";
import { products, priceRanges } from "@/app/lib/data";
import FilterSidebar from "@/app/ui/filters/FilterSidebar";
import ProductGrid from "@/app/ui/product/ProductGrid";
import styles from "./page.module.css";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  price?: string;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, category, price } = await searchParams;

  let filtered = products;

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(lower));
  }

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (price && price !== "All Prices") {
    const range = priceRanges.find((r) => r.label === price);
    if (range) {
      filtered = filtered.filter((p) => {
        if (range.max === null) return p.price >= range.min;
        return p.price >= range.min && p.price <= range.max;
      });
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Discover Unique Handcrafted Treasures
          </h1>
          <p className={styles.heroSubtitle}>
            Supporting local artisans and promoting sustainable consumption,
            <br />
            one handcrafted item at a time.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className={styles.container}>
        <Suspense>
          <FilterSidebar />
        </Suspense>
        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}
