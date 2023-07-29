"use client";

import { ComponentProps, useEffect, useState } from "react";
import { UserReviewDescription } from "./UserReviewDescription";
import { api } from "@/app/services/api";
import { IReview } from "@/app/interfaces";
import { useMovieStore } from "@/app/store/UseMovieStore";
import { ReviewHeader } from "./ReviewHeader";

export type UserReviewProps = ComponentProps<"div"> & {
  id: string;
};

export const UserReview = ({ id, ...props }: UserReviewProps) => {
  const { user } = useMovieStore((store) => store);

  const [review, setReview] = useState<IReview | undefined>(undefined);

  useEffect(() => {
    if (user === undefined) return;

    const fetchReview = async () => {
      try {
        const { data } = await api.get<IReview[]>(
          `/movies/:${id}/reviews?userId=:${user.id}`
        );
        const filteredReview = data.filter(
          (review) => String(review.movieId) === id
        );
        setReview(filteredReview[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReview();
  });

  return review === undefined ? (
    <ReviewHeader hidden={false} />
  ) : (
    <>
      <ReviewHeader hidden />
      <div {...props} className="flex flex-col w-full mx-auto overflow-hidden">
        <span className="text-lg font-bold tracking-wide font-poppins">
          Sua avaliação
        </span>
        <UserReviewDescription rating={review.score}>
          {review.description}
        </UserReviewDescription>
      </div>
    </>
  );
};
