import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/header/Header";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast"; // import toaster
import { Providers } from "@/app/Providers";

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
        <Providers>
          <CartProvider>
            <Header />
            {children}
            <Toaster position="top-right" /> {/* toast notifications */}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}