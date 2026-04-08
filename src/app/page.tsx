import { Suspense } from "react";
import { priceRanges } from "@/app/lib/data";
import FilterSidebar from "@/app/ui/filters/FilterSidebar";
import ProductGrid from "@/app/ui/product/ProductGrid";
import styles from "./page.module.css";

type SearchParams = Promise<{ q?: string; category?: string; price?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const { prisma } = await import("@/app/lib/prisma");
  const { q, category, price } = await searchParams; 

  const range = price && price !== "All Prices"
    ? priceRanges.find((r) => r.label === price)
    : null;

  const dbProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(q && { name: { contains: q, mode: "insensitive" } }),
      ...(category && category !== "All" && { category: { name: category } }),
      ...(range && {
        price: {
          gte: range.min,
          ...(range.max !== null && { lte: range.max }),
        },
      }),
    },
    include: {
      category: true,
      reviews: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const products = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrl,
    price: Number(p.price),
    category: p.category.name,
    reviewCount: p.reviews.length,
    avgRating:
      p.reviews.length > 0
        ? p.reviews.reduce((sum: number, r) => sum + r.rating, 0) / p.reviews.length
        : 0,
  }));

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Discover Unique Handcrafted Treasures</h1>
          <p className={styles.heroSubtitle}>
            Supporting local artisans and promoting sustainable consumption,
            <br />
            one handcrafted item at a time.
          </p>
        </div>
      </section>
      <div className={styles.container}>
        <Suspense>
          <FilterSidebar />
        </Suspense>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
