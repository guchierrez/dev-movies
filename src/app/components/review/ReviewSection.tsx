"use client";

import { ComponentProps, useEffect, useState } from "react";
import { RatingCard } from "../general/RatingCard";
import { IMovieReviews, IReview } from "@/app/interfaces";
import Empty from "@/app/assets/Empty.json";
import Lottie from "lottie-react";
import { useMovieStore } from "@/app/store/UseMovieStore";

export type ReviewSectionProps = ComponentProps<"ul"> & {
  movieId: string;
};

export const ReviewSection = ({ movieId }: ReviewSectionProps) => {
  const { fetchReviews, reviews } = useMovieStore((store) => store);

  useEffect(() => {
    fetchReviews(movieId);
  }, []);

  if (reviews === undefined) return;

  return (
    <>
      {reviews.reviews.length > 0 ? (
        <ul className="relative flex flex-col items-center gap-20 py-20 mx-auto md:grid md:gap-5 md:grid-cols-3">
          {reviews.reviews.map(({ description, score, userId }) => (
            <RatingCard key={userId} userId={String(userId)} rating={score}>
              {description}
            </RatingCard>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Lottie className="h-60" animationData={Empty} />
          <span className="font-bold tracking-wide text-center text-primary font-poppins">
            Não há reviews disponíveis para este filme.
          </span>
        </div>
      )}
    </>
  );
};
