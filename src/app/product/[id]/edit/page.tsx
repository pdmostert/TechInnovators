import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import EditProductForm from "./EditProductForm";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, select: { name: true } });
  if (!product) return { title: "Product Not Found | Handcrafted Haven" };
  return {
    title: `Edit ${product.name} | Handcrafted Haven`,
  };
}

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect(`/auth/login?callbackUrl=/product/${id}/edit`);
  }

  if (session.user.role !== "seller") {
    redirect(`/unauthorized?from=${encodeURIComponent(`/product/${id}/edit`)}`);
  }

  const [product, dbCategories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <main className={styles.container}>
      <Link href={`/product/${product.id}`} className={styles.backLink}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Product
      </Link>

      <div className={styles.heading}>
        <h1 className={styles.title}>Edit Product</h1>
        <p className={styles.subtitle}>Update your product information</p>
      </div>

      <div className={styles.card}>
        <EditProductForm
          product={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            category: product.category.name as Exclude<import("@/app/lib/data").Category, "All">,
            description: product.description,
            image: product.imageUrl,
          }}
          categories={dbCategories.map((c: { name: string }) => c.name as Exclude<import("@/app/lib/data").Category, "All">)}
        />
      </div>
    </main>
  );
}
