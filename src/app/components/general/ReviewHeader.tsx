"use client";

import { ComponentProps } from "react";
import { Button } from "./Button";
import { useMovieStore } from "@/app/store/UseMovieStore";

export type ReviewHeaderProps = ComponentProps<"div"> & {
  hidden: boolean;
};

export const ReviewHeader = ({ hidden }: ReviewHeaderProps) => {
  const { addReviewModalRef } = useMovieStore((store) => store);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-5 py-8">
        <h1 className="text-3xl font-bold tracking-wide font-poppins">
          Avaliações
        </h1>
        {hidden ? (
          <></>
        ) : (
          <Button
            rating
            buttonType="primary"
            size="lg"
            className="text-primary-content"
            onClick={() => addReviewModalRef.current?.showModal()}
          >
            Avaliar
          </Button>
        )}
      </div>
    </div>
  );
};
