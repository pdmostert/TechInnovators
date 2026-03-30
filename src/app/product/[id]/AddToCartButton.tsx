"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import styles from "./page.module.css"; // keep your original styles

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image: imageUrl });
    toast.success(`${name} added to cart!`);
  };

  return (
    <button
      type="button"
      className={styles.addToCart} // keeps the original styling
      onClick={handleAddToCart}
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
      Add to Cart
    </button>
  );
}