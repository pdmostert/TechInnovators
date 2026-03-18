"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginFormProps = {
  callbackUrl: string;
};

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("seller@handcraftedhaven.dev");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (!result || result.error) {
      setError("Invalid credentials. Try one of the demo accounts below.");
      return;
    }

    router.push(result.url ?? callbackUrl);
  }

  return (
    <>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.6rem", borderRadius: 8, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
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
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error ? (
        <p style={{ marginTop: "0.9rem", color: "#9f1239" }}>{error}</p>
      ) : null}

      <div style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}>
        <p style={{ fontWeight: 600 }}>Demo accounts</p>
        <p>Seller: seller@handcraftedhaven.dev / Password123!</p>
        <p>Buyer: buyer@handcraftedhaven.dev / Password123!</p>
      </div>

      <p style={{ marginTop: "1rem" }}>
        No account yet? <Link href="/auth/register">Create one</Link>
      </p>
    </>
  );
}
