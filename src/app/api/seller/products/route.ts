export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { NextResponse } from "next/server";
import { z } from "zod";
import { writeFile } from "fs/promises";
import { join } from "path";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0.01),
  categoryId: z.string().cuid(),
});

export async function GET() {
  const { prisma } = await import("@/app/lib/prisma");
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      where: { sellerId: session.user.id },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { prisma } = await import("@/app/lib/prisma");
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("file") as File | null;

    const parsed = productSchema.safeParse({ name, description, price, categoryId });

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input", errors: parsed.error.format() }, { status: 400 });
    }

    let imageUrl = "/images/placeholder.png";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const path = join(process.cwd(), "public", "uploads", filename);
      
      await writeFile(path, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        imageUrl,
        sellerId: session.user.id,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
