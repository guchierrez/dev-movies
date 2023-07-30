"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { AddReviewForm } from "./AddReviewForm";
import { ComponentProps, useState } from "react";
import { TReviewFormValues } from "@/app/schema/ReviewSchema";

type AddReviewModalProps = ComponentProps<"dialog"> & {
  movieId: string;
};

export const AddReviewModal = ({ movieId, ...props }: AddReviewModalProps) => {
  const { addReviewModalRef } = useMovieStore((store) => store);

  return (
    <dialog {...props} className="modal" ref={addReviewModalRef}>
      <div className="p-8 rounded-sm bg-base-200 modal-box">
        <button
          onClick={() => addReviewModalRef.current?.close()}
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 className="pb-8 text-2xl font-bold tracking-wide font-poppins">
          Avaliação
        </h3>
        <AddReviewForm movieId={movieId} />
      </div>
    </dialog>
  );
};
