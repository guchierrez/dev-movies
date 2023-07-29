import { CategoryBadge } from "./CategoryBadge";
import { MovieDuration } from "./MovieDuration";
import { Rating } from "./Rating";
import { MovieTitle } from "./MovieTitle";
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const movieDetails = tv({
  base: "flex flex-col",
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },
});

export type MovieDetailsProps = ComponentProps<"div"> &
  VariantProps<typeof movieDetails> & {
    category: string;
    duration: number;
    title: string;
    rating: number;
    id: string;
  };

export const MovieDetails = ({
  category,
  duration,
  title,
  rating,
  size,
  id,
  className,
  ...props
}: MovieDetailsProps) => {
  return (
    <div {...props} className={movieDetails({ size, className })}>
      <div className="flex items-end justify-between">
        <CategoryBadge size={size}>{category}</CategoryBadge>
        <MovieDuration size={size}>{duration}</MovieDuration>
      </div>
      <div className="flex items-center justify-between">
        <MovieTitle href={`/movies/${id}`} size={size}>
          {title}
        </MovieTitle>
        <Rating size={size}>{rating}</Rating>
      </div>
    </div>
  );
};
