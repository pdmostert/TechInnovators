"use client";

import styles from "./Dashboard.module.css";
import ProductManager from "./ProductManager";
import Link from "next/link";

interface SellerStats {
  joinedDate: Date;
  productsCount: number;
}

interface SellerViewProps {
  stats: SellerStats;
  userName: string;
}

export default function SellerView({ stats, userName }: SellerViewProps) {
  const memberSince = new Date(stats.joinedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.buyerContainer}>
      <header className={styles.buyerHeader}>
        <h1 id="seller-welcome-title" className={styles.welcomeText}>
          Welcome, {userName.split(" ")[0]}!
        </h1>
        <p className={styles.subText}>
          Your artisan hub for managing handcrafted treasures.
        </p>
      </header>

      {/* Artisanal Snapshot Section */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏷️</div>
          <div>
            <p className={styles.statLabel}>Active Listings</p>
            <p className={styles.statValue}>{stats.productsCount} Products</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏆</div>
          <div>
            <p className={styles.statLabel}>Artisan Level</p>
            <p className={styles.statValue}>Verified Seller</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🗓️</div>
          <div>
            <p className={styles.statLabel}>Member Since</p>
            <p className={styles.statValue}>{memberSince}</p>
          </div>
        </div>
      </section>

      <div className={styles.mainContent} style={{ gridTemplateColumns: "1fr" }}>
        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Product Management</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/" className={styles.shopLink}>
                    View Live Store
                </Link>
                <Link href="/profile" className={styles.shopLink}>
                    My Profile
                </Link>
            </div>
          </div>
          
          {/* Reuse the existing ProductManager for the logic */}
          <ProductManager />
        </section>
      </div>
    </div>
  );
}
