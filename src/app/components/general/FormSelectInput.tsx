"use client";

import { ComponentProps, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type FormSelectInputProps = ComponentProps<"select"> & {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: "score";
};

const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const FormSelectInput = ({
  register,
  name,
  errors,
  ...props
}: FormSelectInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <select
        {...props}
        className={`${
          errors[name]
            ? "border-red-500 focus:border-red-500"
            : "focus:border-primary"
        } outline-none focus:outline-none w-full p-4 text-sm tracking-wide rounded-none h-14 select bg-base-300 font-poppins placeholder:text-white text-white`}
        {...register(name)}
      >
        <option value="">Selecione uma nota</option>
        {options.map((option) => (
          <option key={option} value={Number(option)}>
            {Number(option)}
          </option>
        ))}
      </select>
      <p className="text-xs text-red-500 font-roboto">
        {errors[name]?.message?.toString()}
      </p>
    </div>
  );
};
