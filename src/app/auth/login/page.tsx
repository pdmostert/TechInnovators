import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl = "/profile" } = await searchParams;

  return (
    <main style={{ maxWidth: 540, margin: "4rem auto", padding: "0 1.5rem" }}>
      <header>
        <h1 id="login-title" style={{ marginBottom: "0.5rem", fontSize: "2.2rem", fontFamily: "var(--font-heading)" }}>
          Sign In
        </h1>
        <p style={{ marginBottom: "2rem", color: "var(--color-text)", fontSize: "1.1rem" }}>
          Welcome back! Access your personalized handcrafted experience.
        </p>
      </header>

      <LoginForm callbackUrl={callbackUrl} />
    </main>
  );
}
