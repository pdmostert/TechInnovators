import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      role?: "buyer" | "seller";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "buyer" | "seller";
  }
}
