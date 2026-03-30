"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const total = subtotal + shipping;

  // Form state
  const [form, setForm] = useState({
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

  // Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Client-side validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.zip) newErrors.zip = "Zip code is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.cardNumber || !/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    }
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = "Enter expiry in MM/YY format";
    }
    if (!form.cvc || !/^\d{3}$/.test(form.cvc)) {
      newErrors.cvc = "Enter 3-digit CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock server validation
  const submitOrder = async () => {
    if (!validate()) return;

    try {
      // Simulate server request
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Server validation failed");
        return;
      }

      alert("Order placed successfully!");
      // Redirect to confirmation page or clear cart here
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.content}>
        {/* Left Column */}
        <div className={styles.formColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.row}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={styles.inputHalf}
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={styles.inputHalf}
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

            <input
              type="text"
              name="address"
              placeholder="Address"
              className={styles.input}
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <span className={styles.error}>{errors.address}</span>}

            <div className={styles.row}>
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                className={styles.inputSmall}
                value={form.zip}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className={styles.inputHalf}
                value={form.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className={styles.inputHalf}
                value={form.state}
                onChange={handleChange}
              />
            </div>
            {errors.zip && <span className={styles.error}>{errors.zip}</span>}
            {errors.city && <span className={styles.error}>{errors.city}</span>}
            {errors.state && <span className={styles.error}>{errors.state}</span>}

            <select
              name="country"
              className={styles.input}
              value={form.country}
              onChange={handleChange}
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Other</option>
            </select>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Method</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className={styles.input}
              value={form.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && <span className={styles.error}>{errors.cardNumber}</span>}

            <div className={styles.paymentRow}>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                className={styles.inputSmall}
                value={form.expiry}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cvc"
                placeholder="123"
                className={styles.inputSmall}
                value={form.cvc}
                onChange={handleChange}
              />
            </div>
            {errors.expiry && <span className={styles.error}>{errors.expiry}</span>}
            {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}

            {serverError && <span className={styles.error}>{serverError}</span>}
          </section>
        </div>

        {/* Right Column */}
        <aside className={styles.summaryColumn}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.orderList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.orderTotals}>
            <div>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.actions}>
            {/* Place Order Button */}
            <button
              type="button"
              className={styles.placeOrderButton}
              onClick={(e) => {
                e.preventDefault();
                submitOrder();
              }}
            >
              Place Order
            </button>
            
            <Link href="/cart">
              <button className={styles.backButton}>Back to Cart</button>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}