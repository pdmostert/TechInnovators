import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Temporary in-memory users for Week 3 auth/routing implementation.
// This will be replaced by Prisma-backed user queries in the data lane.
const demoUsers = [
  {
    id: "seller-1",
    name: "Seller Demo",
    email: "seller@handcraftedhaven.dev",
    password: "Password123!",
    role: "seller",
  },
  {
    id: "buyer-1",
    name: "Buyer Demo",
    email: "buyer@handcraftedhaven.dev",
    password: "Password123!",
    role: "buyer",
  },
] as const;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = demoUsers.find(
          (u) =>
            u.email.toLowerCase() === parsed.data.email.toLowerCase() &&
            u.password === parsed.data.password,
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const matched = demoUsers.find((u) => u.email === user.email);
        if (matched) {
          token.role = matched.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "buyer" | "seller" | undefined;
      }
      return session;
    },
  },
};
