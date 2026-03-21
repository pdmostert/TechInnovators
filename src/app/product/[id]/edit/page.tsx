import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { getProductById, categories } from "@/app/lib/data";
import EditProductForm from "./EditProductForm";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found | Handcrafted Haven" };
  return {
    title: `Edit ${product.name} | Handcrafted Haven`,
  };
}

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "seller") {
    redirect("/auth/login");
  }

  const product = getProductById(id);
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
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
          }}
          categories={categories.filter((c) => c !== "All")}
        />
      </div>
    </main>
  );
}
