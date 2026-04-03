import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import { getBuyerStats, getSellerStats } from "@/app/lib/querie";
import BuyerView from "./BuyerView";
import SellerView from "./SellerView";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  const { role, id, name } = session.user;

  // Role-based views
  if (role === "buyer") {
    const stats = await getBuyerStats(id);
    return <BuyerView stats={stats} userName={name || "Valued Customer"} />;
  }

  // Default to Seller View
  const sellerStats = await getSellerStats(id);
  return <SellerView stats={sellerStats} userName={name || "Premium Artisan"} />;
}
