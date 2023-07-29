"use client";

import { ComponentProps } from "react";
import { RatingCard } from "./RatingCard";
import { IMovieReviews } from "@/app/interfaces";
import Empty from "@/app/assets/Empty.json";
import Lottie from "lottie-react";

export type ReviewSectionProps = ComponentProps<"ul"> & {
  movieData: IMovieReviews;
};

export const ReviewSection = ({ movieData }: ReviewSectionProps) => {
  return (
    <>
      {movieData.reviews.length > 0 ? (
        <ul className="relative grid grid-cols-2 gap-5 py-20 lg:grid-cols-3">
          {movieData.reviews.map(({ description, score, userId }) => (
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
