"use client";

import { BsPencil, BsTrash } from "react-icons/bs";
import { Rating } from "../general/Rating";
import { ReviewButton } from "../review/ReviewButton";
import { ComponentProps } from "react";
import { useMovieStore } from "@/app/store/UseMovieStore";

export type UserReviewDescriptionProps = ComponentProps<"div"> & {
  rating: number;
};

export const UserReviewDescription = ({
  rating,
  ...props
}: UserReviewDescriptionProps) => {
  const { editReviewModalRef, deleteReviewModalRef } = useMovieStore(
    (store) => store
  );

  return (
    <div className="flex items-center justify-between w-5/6 gap-16 pt-8 mx-auto overflow-hidden">
      <p className="w-3/4 leading-7 tracking-wide font-roboto">
        {props.children}
      </p>
      <div className="flex gap-5">
        <Rating>{rating}</Rating>
        <ReviewButton
          onClick={() => deleteReviewModalRef.current?.showModal()}
          Icon={BsTrash}
        />
        <ReviewButton
          onClick={() => editReviewModalRef.current?.showModal()}
          Icon={BsPencil}
        />
      </div>
    </div>
  );
};
