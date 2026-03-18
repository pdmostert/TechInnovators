import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/header/Header";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description:
    "Supporting local artisans and promoting sustainable consumption, one handcrafted item at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
