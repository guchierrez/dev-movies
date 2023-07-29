import { ComponentProps } from "react";
import { RatingCard } from "./RatingCard";
import { IMovieReviews } from "@/app/interfaces";

export type ReviewSectionProps = ComponentProps<"ul"> & {
  movieData: IMovieReviews;
};

export const ReviewSection = ({ movieData }: ReviewSectionProps) => {
  return (
    <ul className="relative grid grid-cols-2 gap-5 py-8 lg:grid-cols-3">
      {movieData.reviews.length > 0 ? (
        movieData.reviews.map(({ description, score, userId }) => (
          <RatingCard userId={String(userId)} rating={score}>
            {description}
          </RatingCard>
        ))
      ) : (
        <span className="absolute tracking-wide text-center translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 text-primary font-roboto ">
          Não há reviews disponíveis para este filme.
        </span>
      )}
    </ul>
  );
};
