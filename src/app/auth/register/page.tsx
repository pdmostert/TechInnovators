"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed. Please try again.");
      }

      setStatus({ type: "success", message: "Account created successfully! Redirecting to sign in..." });
      toast.success("Account created!");
      
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle = {
    padding: "0.85rem",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border)",
    transition: "all 0.2s",
    outline: "none",
    width: "100%",
    fontSize: "1rem",
    fontFamily: "var(--font-body)"
  };

  return (
    <main style={{ maxWidth: 540, margin: "3rem auto", padding: "0 1.5rem" }}>
      <header>
        <h1 id="register-title" style={{ marginBottom: "0.5rem", fontSize: "2.2rem", fontFamily: "var(--font-heading)" }}>
          Join Our Community
        </h1>
        <p style={{ marginBottom: "2rem", color: "var(--color-text)", fontSize: "1.1rem" }}>
          Connect with local artisans and find unique handcrafted treasures.
        </p>
      </header>

      {status && (
        <div 
          role="alert"
          aria-live="assertive"
          style={{ 
            padding: "1rem", 
            borderRadius: "var(--radius-md)", 
            marginBottom: "1.5rem",
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: status.type === "success" ? "#ecfdf5" : "#fff1f2",
            color: status.type === "success" ? "var(--color-success)" : "var(--color-error)",
            border: `1px solid ${status.type === "success" ? "#10b981" : "#f43f5e"}`,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
           <svg style={{ width: "20px", height: "20px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {status.type === "success" ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          {status.message}
        </div>
      )}

      <form onSubmit={onSubmit} aria-labelledby="register-title" style={{ display: "grid", gap: "1.75rem" }}>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="name" style={{ fontWeight: 600, color: "var(--color-text)" }}>Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g. Jane Doe"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="email" style={{ fontWeight: 600, color: "var(--color-text)" }}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="yourname@example.com"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label htmlFor="password" style={{ fontWeight: 600, color: "var(--color-text)" }}>Create Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Minimum 8 characters"
            style={inputStyle}
          />
        </div>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, color: "var(--color-text)", paddingBottom: "0.75rem", fontSize: "1rem" }}>
            Account Type
          </legend>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="role"
                value="BUYER"
                checked={role === "BUYER"}
                onChange={() => setRole("BUYER")}
                style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }}
              />
              <span style={{ fontSize: "1.05rem" }}>Buyer</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="role"
                value="SELLER"
                checked={role === "SELLER"}
                onChange={() => setRole("SELLER")}
                style={{ width: "1.2rem", height: "1.2rem", accentColor: "var(--color-primary)" }}
              />
              <span style={{ fontSize: "1.05rem" }}>Seller</span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "1.1rem",
            borderRadius: "var(--radius-md)",
            border: "none",
            background: "var(--color-primary)",
            color: "white",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.7 : 1,
            transition: "all 0.2s"
          }}
        >
          {isSubmitting ? "Creating Account..." : "Create Free Account"}
        </button>
      </form>

      <p style={{ marginTop: "2.5rem", textAlign: "center", fontSize: "1.1rem" }}>
        Already have an account? <Link href="/auth/login" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "underline" }}>Sign in here</Link>
      </p>
    </main>
  );
}
