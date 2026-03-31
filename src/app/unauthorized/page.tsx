import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import styles from "./page.module.css";

type UnauthorizedPageProps = {
  searchParams?: Promise<{
    from?: string;
  }>;
};

export default async function UnauthorizedPage({ searchParams }: UnauthorizedPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }

  const params = searchParams ? await searchParams : undefined;
  const from = params?.from ?? "/dashboard";

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Access Restricted</p>
        <h1 className={styles.title}>Seller account required</h1>
        <p className={styles.message}>
          Your account is currently set to <strong>{session.user.role ?? "buyer"}</strong>, so you cannot
          access seller-only pages like <code>{from}</code>.
        </p>
        <p className={styles.message}>
          You can continue shopping from home or manage your account from your profile.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryBtn} href="/profile">
            Go to Profile
          </Link>
          <Link className={styles.secondaryBtn} href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
