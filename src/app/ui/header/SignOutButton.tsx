"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      style={{
        border: "none",
        background: "transparent",
        color: "#9f1239",
        padding: 0,
      }}
    >
      Sign out
    </button>
  );
}
