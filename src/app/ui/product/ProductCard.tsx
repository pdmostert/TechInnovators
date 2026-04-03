"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export type ProductListItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  category: string;
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className={styles.rating} aria-label={`Rating: ${rating.toFixed(1)} out of 5 (${reviewCount} ${reviewCount === 1 ? "review" : "reviews"})`}>
      <span className={styles.star} aria-hidden="true">★</span>
      <span className={styles.ratingValue} aria-hidden="true">{rating.toFixed(1)}</span>
      <span aria-hidden="true">({reviewCount})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: ProductListItem }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to product page
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price,
      image: product.imageUrl 
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <StarRating rating={product.avgRating} reviewCount={product.reviewCount} />
        <p className={styles.price}>${product.price}</p>
         {/* Updated Add to Cart button */}
        <div className={styles.actions}>
          <button className={styles.addToCart} onClick={handleAddToCart}>
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
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}