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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReviews(movieId, setLoading);
  }, []);

  if (reviews === undefined) return;

  return (
    <>
      {loading ? (
        <div className="relative flex flex-col items-center w-full h-32">
          <span className="absolute bottom-0 text-center translate-x-1/2 loading loading-dots loading-lg text-primary right-1/2"></span>
        </div>
      ) : reviews.reviews.length > 0 ? (
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
