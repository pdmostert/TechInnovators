"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./success.module.css";
import { useEffect } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-UNKNOWN";
  const itemsParam = searchParams.get("items");
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

  useEffect(() => {
  if (!orderId) return;

  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

  // Avoid duplicates
  const alreadyExists = existingOrders.find((o: any) => o.orderId === orderId);

  if (!alreadyExists) {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

  const newOrder = {
    orderId,
    date: new Date().toISOString(),
    items: cartItems, // now real items 
  };

  localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

  // Clear cart after successful order
  localStorage.removeItem("cart");
}

}, [orderId]);

  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className={styles.title}>Order Confirmed!</h1>
      <p className={styles.message}>
        Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.
      </p>
      
      <div className={styles.orderBox}>
        <span className={styles.orderLabel}>Order Number</span>
        <span className={styles.orderId}>{orderId}</span>
      </div>
      
      <div className={styles.info}>
        <p>A confirmation email has been sent to your inbox.</p>
      </div>
      
      <div className={styles.actions}>
        <Link href="/" className={styles.primaryButton}>
          Continue Shopping
        </Link>
        <Link href="/profile" className={styles.secondaryButton}>
          View My Profile
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className={styles.container}>
      <Suspense fallback={<div>Loading confirmation...</div>}>
         <SuccessContent />
      </Suspense>
    </main>
  );
}
