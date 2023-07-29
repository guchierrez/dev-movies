"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";

export const DeleteReviewModal = () => {
  const { deleteReviewModalRef } = useMovieStore((store) => store);

  return (
    <dialog className="modal" ref={deleteReviewModalRef}>
      <div className="bg-base-200 modal-box">
        <button
          onClick={() => deleteReviewModalRef.current?.close()}
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
};
