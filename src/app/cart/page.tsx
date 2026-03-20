"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>
          Your cart is empty.{" "}
          <Link href="/">Browse products</Link>
        </p>
      ) : (
        <>
          <div className={styles.list}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                {/* Info */}
                <div className={styles.info}>
                  <strong>{item.name}</strong>
                  <div>${item.price.toFixed(2)}</div>
                </div>

                {/* Quantity */}
                <div className={styles.quantity}>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className={styles.button}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className={styles.button}
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <strong>Subtotal:</strong> ${subtotal.toFixed(2)}

            <div>
              <Link href="/checkout">
                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}