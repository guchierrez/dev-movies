"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { EditReviewForm } from "./EditReviewForm";
import { ComponentProps } from "react";

type EditReviewModalProps = ComponentProps<"dialog"> & {
  movieId: string;
};

export const EditReviewModal = ({ movieId }: EditReviewModalProps) => {
  const { editReviewModalRef } = useMovieStore((store) => store);

  return (
    <dialog className="modal" ref={editReviewModalRef}>
      <div className="p-8 rounded-sm bg-base-200 modal-box">
        <button
          onClick={() => editReviewModalRef.current?.close()}
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 className="pb-8 text-2xl font-bold tracking-wide font-poppins">
          Editar Avaliação
        </h3>
        <EditReviewForm movieId={movieId} />
      </div>
    </dialog>
  );
};
