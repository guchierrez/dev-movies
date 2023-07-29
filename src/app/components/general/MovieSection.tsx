import { ComponentProps } from "react";
import { MovieCard } from "./MovieCard";
import { IMovie } from "@/app/store/UseMovieStore";

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
          rating={movie.reviews.reduce((acc, review) => acc + review.score, 0)}
          title={movie.name}
          size="sm"
          id={String(movie.id)}
        />
      ))}
    </ul>
  );
};
