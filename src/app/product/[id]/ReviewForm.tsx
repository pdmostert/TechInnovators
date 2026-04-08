"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Props = {
  productId: string;
  onReviewAdded: () => void;
};

export default function ReviewForm({ productId, onReviewAdded }: Props) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!title.trim()) {
      setError("Please enter a review title");
      setLoading(false);
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment for your review");
      setLoading(false);
      return;
    }

    if (comment.trim().length < 10) {
      setError("Review comment must be at least 10 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          body: comment.trim(),
          title: title.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      // Reset form
      setTitle("");
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3>Write a Review</h3>

      {error && (
        <div className={styles.reviewFormError}>
          <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <label>
        Review Title
        <input
          type="text"
          placeholder="e.g., Excellent craftsmanship!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          disabled={loading}
        />
      </label>

      <label>
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        >
          <option value={5}>⭐⭐⭐⭐⭐ - Excellent (5 stars)</option>
          <option value={4}>⭐⭐⭐⭐ - Good (4 stars)</option>
          <option value={3}>⭐⭐⭐ - Average (3 stars)</option>
          <option value={2}>⭐⭐ - Poor (2 stars)</option>
          <option value={1}>⭐ - Very Poor (1 star)</option>
        </select>
      </label>

      <label>
        Your Review
        <textarea
          placeholder="Share your experience with this product. What do you like? How is the quality? Would you recommend it?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          disabled={loading}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Submit Review</span>
          </>
        )}
      </button>
    </form>
  );
}