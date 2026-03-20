import LoginForm from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl = "/profile" } = await searchParams;

  return (
    <main style={{ maxWidth: 540, margin: "3rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Sign In</h1>
      <p style={{ marginBottom: "1.25rem" }}>
        Week 3 demo auth is enabled. This will move to Prisma users next.
      </p>

      <LoginForm callbackUrl={callbackUrl} />
    </main>
  );
}
