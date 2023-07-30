"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { Button } from "../general/Button";
import { FormSelectInput } from "../general/FormSelectInput";
import { FormTextareaInput } from "../general/FormTextareaInput";
import { ReviewFormSchema, TReviewFormValues } from "@/app/schema/ReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ComponentProps, useState } from "react";

type editReviewFormProps = ComponentProps<"form"> & {
  movieId: string;
};

export const EditReviewForm = ({ movieId, ...props }: editReviewFormProps) => {
  const {
    editReviewModalRef,
    user,
    editReview,
    fetchReview,
    fetchReviews,
    currentReview,
  } = useMovieStore((store) => store);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
  });

  const submit = (formData: TReviewFormValues) => {
    if (user === undefined) return;
    editReview(
      formData,
      setLoading,
      String(user.id),
      movieId,
      String(currentReview?.id),
      () => {
        editReviewModalRef.current?.close();
        fetchReview(movieId, String(user.id));
        fetchReviews(movieId);
      }
    );
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-5"
    >
      <FormSelectInput
        register={register}
        errors={errors}
        name="score"
        defaultValue={currentReview?.score}
      />
      <FormTextareaInput
        register={register}
        errors={errors}
        name="description"
        defaultValue={currentReview?.description}
      />
      <Button
        loading={loading}
        disabled={loading}
        type="submit"
        className="self-start"
        rating
        buttonType="primary"
      >
        Editar
      </Button>
    </form>
  );
};
