"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { checkoutSchema, type CheckoutFormData } from "@/app/lib/validations/checkout";
import toast from "react-hot-toast";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const total = subtotal + shipping;

  const [form, setForm] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "United States",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Basic formatting for card number (removing spaces)
    const cleanValue = name === "cardNumber" ? value.replace(/\s+/g, "") : value;

    setForm({ ...form, [name]: cleanValue });
    // Clear error for that field
    if (errors[name as keyof CheckoutFormData]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submitOrder = async () => {
    // 1. Client-Side Validation
    const validation = checkoutSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof CheckoutFormData;
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors before placing order.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing your order securely...");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to process order. Please try again.", { id: loadingToast });
        if (data.errors) {
          setErrors(data.errors);
        }
        return;
      }

      toast.success("Order confirmed! Thank you for your purchase.", { id: loadingToast });
      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "A network error occurred. Please check your connection.";
      toast.error(message, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.emptyContainer}>
          <h1 className={styles.title}>Your Cart is Empty</h1>
          <p>Please add items to your cart before proceeding to checkout.</p>
          <Link href="/" className={styles.backButton}>Go Back Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Secure Checkout</h1>

      <div className={styles.content}>
        <div className={styles.formColumn}>
          {/* Contact Information */}
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
               <span>Contact Information</span>
            </div>
            <div className={styles.inputGroup}>
               <label htmlFor="email" className={styles.label}>Email Address</label>
               <input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="you@example.com"
                 className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                 value={form.email}
                 onChange={handleChange}
                 aria-invalid={!!errors.email}
               />
               {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
          </section>

          {/* Shipping Address */}
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
               <span>Shipping Address</span>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroupHalf}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className={styles.errorMessage}>{errors.firstName}</p>}
              </div>
              <div className={styles.inputGroupHalf}>
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className={styles.errorMessage}>{errors.lastName}</p>}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="address" className={styles.label}>Full Street Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Full Street Address"
                className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroupThird}>
                <label htmlFor="zip" className={styles.label}>Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="Zip Code"
                  className={`${styles.input} ${errors.zip ? styles.inputError : ""}`}
                  value={form.zip}
                  onChange={handleChange}
                />
                {errors.zip && <p className={styles.errorMessage}>{errors.zip}</p>}
              </div>
              <div className={styles.inputGroupThird}>
                <label htmlFor="city" className={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && <p className={styles.errorMessage}>{errors.city}</p>}
              </div>
              <div className={styles.inputGroupThird}>
                <label htmlFor="state" className={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  className={`${styles.input} ${errors.state ? styles.inputError : ""}`}
                  value={form.state}
                  onChange={handleChange}
                />
                {errors.state && <p className={styles.errorMessage}>{errors.state}</p>}
              </div>
            </div>

            <label htmlFor="country" className={styles.label}>Country</label>
            <select
              name="country"
              id="country"
              className={styles.input}
              value={form.country}
              onChange={handleChange}
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </section>

          {/* Payment Method */}
          <section className={styles.section}>
            <div className={styles.sectionHeading}>
               <span>Secure Payment</span>
            </div>
            <div className={styles.inputGroup}>
               <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
               <input
                 type="text"
                 name="cardNumber"
                 id="cardNumber"
                 maxLength={16}
                 placeholder="Card Number (16 digits)"
                 className={`${styles.input} ${errors.cardNumber ? styles.inputError : ""}`}
                 value={form.cardNumber}
                 onChange={handleChange}
               />
               {errors.cardNumber && <p className={styles.errorMessage}>{errors.cardNumber}</p>}
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroupHalf}>
                  <label htmlFor="expiry" className={styles.label}>Expiration Date (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    id="expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`${styles.input} ${errors.expiry ? styles.inputError : ""}`}
                    value={form.expiry}
                    onChange={handleChange}
                  />
                  {errors.expiry && <p className={styles.errorMessage}>{errors.expiry}</p>}
                </div>
                <div className={styles.inputGroupHalf}>
                  <label htmlFor="cvc" className={styles.label}>CVC</label>
                  <input
                    type="password"
                    name="cvc"
                    id="cvc"
                    placeholder="CVC"
                    maxLength={4}
                    className={`${styles.input} ${errors.cvc ? styles.inputError : ""}`}
                    value={form.cvc}
                    onChange={handleChange}
                  />
                  {errors.cvc && <p className={styles.errorMessage}>{errors.cvc}</p>}
                </div>
              </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <aside className={styles.summaryColumn}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.orderList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.itemInfo}>
                   <span className={styles.itemName}>{item.name}</span>
                   <span className={styles.itemQty}>Quantity: {item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.orderTotals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.grandTotal}>
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.placeOrderButton}
              disabled={isSubmitting}
              onClick={() => submitOrder()}
            >
              {isSubmitting ? "Processing..." : "Secure Order Now"}
            </button>
            
            <button
              type="button"
              className={styles.backToCartButton}
              onClick={() => router.push('/cart')}
            >
              Return to Cart
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
