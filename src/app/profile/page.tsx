import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import SignOutButton from "@/app/ui/header/SignOutButton";
import styles from "./Profile.module.css";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/profile");
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.banner}></div>
        <div className={styles.cardBody}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
               {session.user.email?.charAt(0).toUpperCase() || "?"}
            </div>
          </div>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.email}>{session.user.email}</p>
          
          <div className={styles.roleBox}>
            <div>
              <p className={styles.roleLabel}>Account Role</p>
              <p className={styles.roleValue}>{session.user.role ?? "buyer"}</p>
            </div>
            <div className={styles.badge}>
              Active Status
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/" className={styles.btnSecondary}>
              Back to Home
            </Link>
            <Link href="/dashboard" className={styles.btnPrimary}>
              Open Dashboard
            </Link>
            <div className={styles.signOutWrapper}>
               <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
