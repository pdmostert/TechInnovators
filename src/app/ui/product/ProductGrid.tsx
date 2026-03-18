import type { Product } from "@/app/lib/data";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className={styles.section}>
      <p className={styles.count}>
        {products.length} {products.length === 1 ? "item" : "items"} found
      </p>

      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>
            No items match your filters. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </section>
  );
}
