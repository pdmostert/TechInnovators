"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Review = {
  rating: number;
  title?: string;
  body: string;
  user: { name: string };
};

type Props = {
  productId: string;
};

export default function Reviews({ productId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/reviews/${productId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch reviews");
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className={styles.reviewsList}>
      {reviews.map((r, i) => (
        <div key={i} className={styles.reviewItem}>
          <strong>{r.user.name}</strong> - {r.rating}★ {r.title && `| ${r.title}`}
          <p>{r.body}</p>
        </div>
      ))}
    </div>
  );
}