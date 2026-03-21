import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { getProductById, getSellerById } from "@/app/lib/data";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return { title: "Product Not Found | Handcrafted Haven" };
  }
  return {
    title: `${product.name} | Handcrafted Haven`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

// ── Inner async component so Suspense can stream it ────────────────────────
async function ProductDetailContent({ id }: { id: string }) {
  const product = getProductById(id);
  if (!product) notFound();

  const seller = getSellerById(product.sellerId);
  const session = await getServerSession(authOptions);
  const canEdit = session?.user?.role === "seller";

  return (
    <>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/?category=${product.category}`}>{product.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className={styles.product}>
        {/* Left – image */}
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            priority
          />
        </div>

        {/* Right – details */}
        <div className={styles.details}>
          {/* Name + edit button */}
          <div className={styles.detailsHeader}>
            <h1 className={styles.name}>{product.name}</h1>
            {canEdit && (
              <Link
                href={`/product/${product.id}/edit`}
                className={styles.editBtn}
                aria-label={`Edit ${product.name}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </Link>
            )}
          </div>

          {/* Rating */}
          <div className={styles.rating}>
            <span className={styles.star} aria-hidden="true">
              ★
            </span>
            <span className={styles.ratingValue}>
              {product.rating.toFixed(1)}
            </span>
            <span className={styles.reviewCount}>
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <p className={styles.price}>${product.price}</p>

          {/* Description */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.description}>{product.description}</p>
          </div>

          {/* Category */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Category</h2>
            <span className={styles.badge}>{product.category}</span>
          </div>

          <hr className={styles.divider} />

          {/* Seller */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Sold by</h2>
            {seller && (
              <div className={styles.sellerCard}>
                <div className={styles.sellerAvatar} aria-hidden="true">
                  {seller.name.charAt(0)}
                </div>
                <div>
                  <p className={styles.sellerName}>{seller.name}</p>
                  <p className={styles.sellerLocation}>{seller.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.addToCart} type="button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1={3} y1={6} x2={21} y2={6} />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Add to wishlist"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Share product"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1={8.59} y1={13.51} x2={15.42} y2={17.49} />
                <line x1={15.41} y1={6.51} x2={8.59} y2={10.49} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonDetails} />
    </div>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <main className={styles.container}>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent id={id} />
      </Suspense>
    </main>
  );
}
