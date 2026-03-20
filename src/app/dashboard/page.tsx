import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  return (
    <main style={{ maxWidth: 900, margin: "3rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "0.75rem" }}>Seller Dashboard</h1>
      <p style={{ marginBottom: "1rem" }}>
        Week 3 routing is live. Product CRUD widgets will be added by the seller
        lane.
      </p>

      <section
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "1rem",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Account Snapshot</h2>
        <p>Email: {session.user?.email}</p>
        <p>Role: {session.user?.role ?? "buyer"}</p>
      </section>
    </main>
  );
}
