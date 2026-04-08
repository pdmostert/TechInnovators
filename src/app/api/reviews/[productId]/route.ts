export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const { prisma } = await import("@/app/lib/prisma");

  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    select: {
      rating: true,
      title: true,
      body: true,
      createdAt: true,
      user: { select: { name: true } },
    },
  });

  return NextResponse.json(reviews);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "buyer") {
      return NextResponse.json({ error: "Only buyers can submit reviews" }, { status: 403 });
    }

    const { productId } = await params;
    const { prisma } = await import("@/app/lib/prisma");
    const body = await request.json();
    const { rating, body: comment, title } = body;

    if (!rating || !comment) {
      return NextResponse.json({ error: "Missing rating or body" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        body: comment,
        title: title || null,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}