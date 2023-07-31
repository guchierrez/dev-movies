"use client";

import { ComponentProps, useEffect, useState } from "react";
import { useMovieStore } from "@/app/store/UseMovieStore";
import { ReviewSectionLoading } from "./ReviewSectionLoading";
import { EmptyReviewSection } from "./EmptyReviewSection";
import { ReviewList } from "./ReviewList";

export type ReviewSectionProps = ComponentProps<"ul"> & {
  movieId: string;
};

export const ReviewSection = ({ movieId }: ReviewSectionProps) => {
  const { fetchReviews, reviews } = useMovieStore((store) => store);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReviews(movieId, setLoading);
  }, []);

  if (reviews === undefined) return;

  return (
    <>
      {loading ? (
        <ReviewSectionLoading />
      ) : reviews.reviews.length > 0 ? (
        <ReviewList data={reviews.reviews} />
      ) : (
        <EmptyReviewSection />
      )}
    </>
  );
};
