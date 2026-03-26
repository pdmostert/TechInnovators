"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/lib/data";
import styles from "./ProductCard.module.css";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <div className={styles.rating}>
      <span className={styles.star} aria-hidden="true">
        ★
      </span>
      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      <span>({reviewCount})</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigating to product page
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price,
      image: product.image 
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <p className={styles.price}>${product.price}</p>
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}