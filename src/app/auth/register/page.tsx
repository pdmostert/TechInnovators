"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={{ maxWidth: 540, margin: "3rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Create Account</h1>
      <p style={{ marginBottom: "1.25rem" }}>
        Registration UI is ready. Database-backed account creation will be wired in
        after Prisma setup is merged.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength={8}
          required
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            marginTop: "0.5rem",
            padding: "0.7rem",
            borderRadius: 8,
            border: "none",
            background: "#D4735E",
            color: "white",
            fontWeight: 600,
          }}
        >
          Create Account
        </button>
      </form>

      {submitted ? (
        <p style={{ marginTop: "0.9rem", color: "#166534" }}>
          Registration request captured for Week 3 integration. Use demo login for
          now.
        </p>
      ) : null}

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/auth/login">Sign in</Link>
      </p>
    </main>
  );
}
