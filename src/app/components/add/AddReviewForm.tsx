"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { Button } from "../general/Button";
import { FormSelectInput } from "../general/FormSelectInput";
import { FormTextareaInput } from "../general/FormTextareaInput";
import { ReviewFormSchema, TReviewFormValues } from "@/app/schema/ReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ComponentProps, useState } from "react";

type addReviewFormProps = ComponentProps<"form"> & {
  movieId: string;
};

export const AddReviewForm = ({ movieId, ...props }: addReviewFormProps) => {
  const { addReviewModalRef, user, addReview, fetchReview, fetchReviews } =
    useMovieStore((store) => store);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
  });

  const submit = (formData: TReviewFormValues) => {
    if (user === undefined) return;
    addReview(formData, setLoading, String(user.id), movieId, () => {
      addReviewModalRef.current?.close();
      reset();
      fetchReview(movieId, String(user.id));
      fetchReviews(movieId);
    });
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-5"
    >
      <FormSelectInput register={register} errors={errors} name="score" />
      <FormTextareaInput
        register={register}
        errors={errors}
        name="description"
      />
      <Button
        loading={loading}
        disabled={loading}
        type="submit"
        className="self-start"
        rating
        buttonType="primary"
      >
        Avaliar
      </Button>
    </form>
  );
};
