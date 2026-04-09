"use client";

import Link from "next/link";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";

interface BuyerViewProps {
  stats: {
    joinedDate: Date;
    reviewsCount: number;
  };
  userName: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  orderId: string;
  date: string;
  items?: OrderItem[];
}

export default function BuyerView({ stats, userName }: BuyerViewProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(stats.joinedDate));

  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false); // wait for client

  useEffect(() => {
    setMounted(true);
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const validatedOrders: Order[] = storedOrders.map((order: any) => ({
      orderId: order.orderId,
      date: order.date,
      items: order.items || [],
    }));
    setOrders(validatedOrders);
  }, []);

  if (!mounted) return null; // do not render on server

  return (
    <div className={styles.buyerContainer}>
      <header className={styles.buyerHeader}>
        <h1 className={styles.welcomeText}>Welcome back, {userName}!</h1>
        <p className={styles.subText}>Your artisanal journey at Handcrafted Haven.</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div>
            <p className={styles.statLabel}>Member Since</p>
            <p className={styles.statValue}>{formattedDate}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div>
            <p className={styles.statLabel}>Reviews Shared</p>
            <p className={styles.statValue}>{stats.reviewsCount}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏺</div>
          <div>
            <p className={styles.statLabel}>Artisans Supported</p>
            <p className={styles.statValue}>0</p>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>My Shopping Snapshot</h2>
            <Link href="/" className={styles.shopLink}>Browse Shop</Link>
          </div>

          {orders.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🛍️</div>
              <h3>No orders yet?</h3>
              <p>Your next favorite handcrafted treasure is waiting to be discovered.</p>
              <Link href="/" className={styles.ctaButton}>Start Exploring</Link>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
              <div key={order.orderId} className={styles.statCard}>
                {/* Left: Images */}
                <div className={styles.statIcon}>
                  {order.items && order.items.length > 0 ? (
                    <div className={styles.imageStack}>
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.name}
                        />
                      ))}
                      {order.items.length > 3 && (
                        <span className={styles.moreItems}>
                          +{order.items.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    "📦"
                  )}
                </div>

                {/* Middle: Product Name */}
                <div className={styles.statProduct}>
                    {order.items && order.items.length > 0 && (
                    <>
                      <p className={styles.statLabel}>Product</p>
                      <p className={styles.statValue}>
                        {order.items[0].name}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                    </>
                  )}
                </div>
                {/* Right: Order Number */}
                <div className={styles.statOrder}>
                  <p className={styles.statLabel}>Order Number</p>
                  <p className={styles.statValue}>{order.orderId}</p>
                </div>
              </div>
              ))}
            </div>
          )}
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3>Community Contribution</h3>
            <p>Your reviews help other shoppers find the best quality items and support local artisans.</p>
            <button className={styles.sideButton} disabled>View My Reviews</button>
          </div>

          <div className={styles.sideCard}>
            <h3>Account Settings</h3>
            <p>Manage your shipping addresses and personal information.</p>
            <Link href="/profile" className={styles.sideButton}>Edit Profile</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}