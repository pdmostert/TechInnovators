import { notFound } from "next/navigation";

export default function CheckoutPage() {
  // Since the checkout page is not yet implemented, 
  // we trigger the custom not-found state as requested.
  notFound();
}
