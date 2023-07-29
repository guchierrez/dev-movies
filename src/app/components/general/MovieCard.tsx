import { ComponentProps } from "react";
import { MovieDetails } from "./MovieDetails";
import Link from "next/link";

export type MovieCardProps = ComponentProps<"li"> & {
  image: string;
  category: string;
  duration: number;
  title: string;
  rating: number;
  size: "md" | "sm";
  id: string;
};

export const MovieCard = ({
  image,
  category,
  duration,
  rating,
  title,
  size,
  id,
  ...props
}: MovieCardProps) => {
  return (
    <li {...props} className="flex flex-col gap-5 min-w-[15rem] p-2">
      <Link
        href={`/movies/${id}`}
        className="overflow-hidden cursor-pointer rounded-2xl"
      >
        <img
          className="object-cover w-full transition-transform duration-1000 scale-105 hover:scale-110"
          src={image}
        />
      </Link>
      <MovieDetails
        category={category}
        duration={duration}
        rating={rating}
        title={title}
        size={size}
        id={id}
      />
    </li>
  );
};
