"use client";

import { ComponentProps, useEffect } from "react";
import { UserReviewDescription } from "./UserReviewDescription";
import { useMovieStore } from "@/app/store/UseMovieStore";
import { ReviewHeader } from "../review/ReviewHeader";

export type UserReviewProps = ComponentProps<"div"> & {
  id: string;
};

export const UserReview = ({ id, ...props }: UserReviewProps) => {
  const { user, fetchReview, currentReview } = useMovieStore((store) => store);

  useEffect(() => {
    if (user === undefined) return;
    fetchReview(id, String(user.id));
  }, [user]);

  return currentReview === undefined ? (
    <ReviewHeader hidden={user === undefined ? true : false} />
  ) : (
    <>
      <ReviewHeader hidden />
      <div {...props} className="flex flex-col w-full mx-auto overflow-hidden">
        <span className="text-lg font-bold tracking-wide font-poppins">
          Sua avaliação
        </span>
        <UserReviewDescription rating={currentReview.score}>
          {currentReview.description}
        </UserReviewDescription>
      </div>
    </>
  );
};
