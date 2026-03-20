import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import Link from "next/link";
import styles from "./Dashboard.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        {/* Header Section */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Seller Dashboard</h1>
            <p className={styles.subtitle}>
              Manage your store, handcrafted products, and view your business snapshot.
            </p>
          </div>
          <div className={styles.navActions}>
            <Link href="/" className={styles.navBtnHome}>
              Home
            </Link>
            <Link href="/profile" className={styles.navBtnProfile}>
              View Profile
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Account Snapshot Card */}
          <section className={`${styles.card} ${styles.colSpan1}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Snapshot
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div>
                <p className={styles.label}>Email</p>
                <p className={styles.value}>{session.user?.email}</p>
              </div>
              <div>
                <p className={styles.label}>Role</p>
                <span className={styles.badgeRole}>
                  {session.user?.role ?? "buyer"}
                </span>
              </div>
            </div>
          </section>

          {/* Main Content Area Placeholder for Widgets */}
          <section className={`${styles.widgetArea} ${styles.colSpan2}`}>
            <div className={styles.widgetIconBox}>
              <svg className={styles.widgetIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className={styles.widgetTitle}>Product Management</h3>
            <p className={styles.widgetDesc}>
              Manage all of your artisanal goods from here. Product widgets and store analytics are rolling out soon.
            </p>
            <button className={styles.widgetBtn}>
              Add New Product
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
