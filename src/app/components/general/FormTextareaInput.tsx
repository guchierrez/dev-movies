"use client";

import { ComponentProps, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type FormTextareaProps = ComponentProps<"textarea"> & {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: "description";
};

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const FormTextareaInput = ({
  register,
  name,
  errors,
  ...props
}: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        {...props}
        className={`${
          errors[name]
            ? "border-red-500 focus:border-red-500"
            : "focus:border-primary"
        } outline-none focus:outline-none w-full resize-none p-4 text-sm tracking-wide rounded-none h-14 textarea textarea-lg bg-base-300 font-poppins placeholder:text-white text-white`}
        {...register(name)}
      />
      <p className="text-xs text-red-500 font-roboto">
        {errors[name]?.message?.toString()}
      </p>
    </div>
  );
};
