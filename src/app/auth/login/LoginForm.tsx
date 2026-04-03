"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

type LoginFormProps = {
  callbackUrl: string;
};

export default function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "CredentialsSignin") {
      setStatus({ type: "error", message: "Invalid email or password. Please try again." });
    }
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRedirecting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isRedirecting && countdown === 0) {
      router.push(searchParams.get("callbackUrl") ?? callbackUrl);
    }
    return () => clearInterval(timer);
  }, [isRedirecting, countdown, router, callbackUrl, searchParams]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setStatus({ type: "error", message: "Invalid email or password. Please check your credentials." });
        setIsSubmitting(false);
        return;
      }

      setStatus({ type: "success", message: "Successfully signed in!" });
      setIsRedirecting(true);
    } catch (err) {
      setStatus({ type: "error", message: "An unexpected error occurred. Please try again later." });
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {status && (
        <div 
          role="alert"
          aria-live="assertive"
          style={{ 
            padding: "1.25rem", 
            borderRadius: "var(--radius-md)", 
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: status.type === "success" ? "#F0FDFA" : "#FFF1F2",
            color: status.type === "success" ? "#065F46" : "#991B1B",
            border: `1px solid ${status.type === "success" ? "#10B981" : "#F43F5E"}`,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <svg style={{ width: "24px", height: "24px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {status.type === "success" ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0 }}>{status.message}</p>
              {isRedirecting && (
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", opacity: 0.9 }}>
                  Redirecting to your dashboard in <strong>{countdown}</strong> seconds...
                </p>
              )}
            </div>
          </div>
          
          {isRedirecting && (
            <div style={{ 
              width: "100%", 
              height: "4px", 
              backgroundColor: "#D1FAE5", 
              borderRadius: "2px",
              overflow: "hidden"
            }}>
              <div style={{ 
                height: "100%", 
                backgroundColor: "#10B981", 
                width: `${((5 - countdown) / 5) * 100}%`,
                transition: "width 1s linear"
              }} />
            </div>
          )}
        </div>
      )}

      {!isRedirecting && (
        <form onSubmit={onSubmit} aria-labelledby="login-title" style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ fontWeight: 600, color: "var(--color-text)" }}>Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. artisan@handcraftedhaven.com"
              aria-describedby={status?.type === "error" ? "login-error-msg" : undefined}
              style={{ 
                padding: "0.85rem", 
                borderRadius: "var(--radius-sm)", 
                border: "1px solid var(--color-border)",
                fontSize: "1rem",
                fontFamily: "var(--font-body)",
                transition: "box-shadow 0.2s, border-color 0.2s",
                outline: "none"
              }}
            />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label htmlFor="password" style={{ fontWeight: 600, color: "var(--color-text)" }}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ 
                padding: "0.85rem", 
                borderRadius: "var(--radius-sm)", 
                border: "1px solid var(--color-border)",
                fontSize: "1rem",
                fontFamily: "var(--font-body)",
                transition: "box-shadow 0.2s, border-color 0.2s",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: "var(--color-primary)",
              color: "white",
              fontWeight: 600,
              fontSize: "1.05rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              transition: "transform 0.1s active, opacity 0.2s"
            }}
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Your Account"}
          </button>
        </form>
      )}

      <p style={{ textAlign: "center", fontSize: "1rem" }}>
        No account yet? <Link href="/auth/register" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "underline" }}>Create a new account</Link>
      </p>
    </div>
  );
}
