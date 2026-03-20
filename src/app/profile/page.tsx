import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import SignOutButton from "@/app/ui/header/SignOutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/profile");
  }

  return (
    <main style={{ maxWidth: 720, margin: "3rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "0.75rem" }}>My Profile</h1>
      <p style={{ marginBottom: "0.25rem" }}>
        Signed in as <strong>{session.user.email}</strong>
      </p>
      <p style={{ marginBottom: "1rem" }}>
        Role: <strong>{session.user.role ?? "buyer"}</strong>
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#D4735E" }}>
          Back to home
        </Link>
        <Link href="/dashboard" style={{ color: "#D4735E" }}>
          Open dashboard
        </Link>
        <SignOutButton />
      </div>
    </main>
  );
}
