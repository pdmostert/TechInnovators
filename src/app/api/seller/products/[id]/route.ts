import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().min(0.01).optional(),
  imageUrl: z.string().url().or(z.string().startsWith("/")).optional(),
  categoryId: z.string().cuid().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input", errors: parsed.error.format() }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.sellerId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.sellerId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Soft-delete: set isActive to false instead of hard deleting.
    // A hard delete would fail because existing OrderItems reference this product
    // via an onDelete: Restrict constraint, and it also preserves buyer order history.
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

