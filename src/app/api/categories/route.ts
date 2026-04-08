export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export async function GET() {
  const { prisma } = await import("@/app/lib/prisma");
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}
