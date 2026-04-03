"use client";

import Link from "next/link";
import styles from "./Dashboard.module.css";

interface BuyerViewProps {
  stats: {
    joinedDate: Date;
    reviewsCount: number;
  };
  userName: string;
}

export default function BuyerView({ stats, userName }: BuyerViewProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(stats.joinedDate));

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

          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🛍️</div>
            <h3>No orders yet?</h3>
            <p>Your next favorite handcrafted treasure is waiting to be discovered.</p>
            <Link href="/" className={styles.ctaButton}>Start Exploring</Link>
          </div>
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
