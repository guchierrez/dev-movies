"use client";

import { ComponentProps } from "react";
import { MovieCard } from "./MovieCard";
import { IMovie } from "@/app/interfaces";

export type IMovieSectionProps = ComponentProps<"ul"> & {
  movieData: IMovie[];
};

export const MovieSection = ({ movieData, ...props }: IMovieSectionProps) => {
  return (
    <ul
      {...props}
      className="flex flex-row w-full gap-6 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-primary scrollbar-track-inherit scrollbar-thumb-rounded"
    >
      {movieData.map((movie) => (
        <MovieCard
          category={movie.type}
          duration={movie.duration}
          image={movie.image}
          rating={
            movie.reviews.length === 0
              ? 0
              : movie.reviews.reduce(
                  (acc, review) => Number(acc) + Number(review.score),
                  0
                ) / movie.reviews.length
          }
          title={movie.name}
          size="sm"
          key={movie.id}
          id={String(movie.id)}
        />
      ))}
    </ul>
  );
};
