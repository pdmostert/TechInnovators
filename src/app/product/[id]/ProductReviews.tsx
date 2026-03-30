"use client"; // client component

import { useState } from "react";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";

type Review = {
  rating: number;
  body: string;
  userName: string;
};

type Props = { productId: string };

export default function ProductReviews({ productId }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshReviews = () => setRefreshKey((prev) => prev + 1);

  return (
    <section>
      <h2>Customer Reviews</h2>
      <Reviews key={refreshKey} productId={productId} />
      <ReviewForm productId={productId} onReviewAdded={refreshReviews} />
    </section>
  );
}