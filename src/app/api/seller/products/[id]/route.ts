import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { NextResponse } from "next/server";
import { z } from "zod";
import { writeFile } from "fs/promises";
import { join } from "path";

const productSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().min(0.01).optional(),
  imageUrl: z.string().url().or(z.string().startsWith("/")).optional(),
  categoryId: z.string().cuid().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await import("@/app/lib/prisma");
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const contentType = req.headers.get("content-type");
    let data: Record<string, any> = {};

    // Handle FormData (file uploads)
    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      
      const name = formData.get("name") as string | null;
      const description = formData.get("description") as string | null;
      const price = formData.get("price") as string | null;
      const categoryId = formData.get("categoryId") as string | null;
      const file = formData.get("file") as File | null;

      if (name) data.name = name;
      if (description) data.description = description;
      if (price) data.price = Number(price);
      if (categoryId) data.categoryId = categoryId;

      // Handle file upload
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const path = join(process.cwd(), "public", "uploads", filename);
        
        await writeFile(path, buffer);
        data.imageUrl = `/uploads/${filename}`;
      }
    } else {
      // Handle JSON body
      data = await req.json();
    }

    const parsed = productSchema.safeParse(data);

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
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { prisma } = await import("@/app/lib/prisma");
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

