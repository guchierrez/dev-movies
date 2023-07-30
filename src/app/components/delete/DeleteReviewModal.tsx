"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { Button } from "../general/Button";
import { ComponentProps, useState } from "react";

type DeleteReviewModalProps = ComponentProps<"dialog"> & {
  movieId: string;
};

export const DeleteReviewModal = ({ movieId }: DeleteReviewModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    deleteReviewModalRef,
    currentReview,
    deleteReview,
    fetchReview,
    fetchReviews,
    user,
    token,
  } = useMovieStore((store) => store);

  const handleDelete = () => {
    if (user === undefined || currentReview === undefined || token === null)
      return;
    deleteReview(String(currentReview.id), token, setLoading, () => {
      console.log(currentReview.id);
      deleteReviewModalRef.current?.close();
      fetchReview(movieId, String(user.id));
      fetchReviews(movieId);
    });
  };

  return (
    <dialog className="modal" ref={deleteReviewModalRef}>
      <div className="p-8 rounded-sm bg-base-200 modal-box">
        <button
          onClick={() => deleteReviewModalRef.current?.close()}
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 className="pb-4 text-2xl font-bold tracking-wide font-poppins">
          Excluir avaliação
        </h3>
        <p className="pb-4 tracking-wide font-roboto">
          Tem certeza que deseja excluir sua availação
        </p>
        <Button
          onClick={handleDelete}
          buttonType="primary"
          className="self-end"
          loading={loading}
          disabled={loading}
        >
          Excluir
        </Button>
      </div>
    </dialog>
  );
};
