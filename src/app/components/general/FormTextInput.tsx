"use client";

import { ComponentProps, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type InputName = "email" | "password" | "name" | "confirm" | "description";

export type FormTextInputProps = ComponentProps<"input"> & {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: InputName;
};

export const FormTextInput = ({
  register,
  name,
  errors,
  ...props
}: FormTextInputProps) => {
  const [inputType, setInputType] = useState<string>("password");

  const toggleState = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <input
          {...props}
          type={props.type === "password" ? inputType : props.type}
          className={`${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "focus:border-primary"
          } outline-none focus:outline-none w-full p-4 text-sm tracking-wide rounded-none h-14 input bg-base-300 font-poppins placeholder:text-white text-primary`}
          {...register(name)}
        />
        {props.type === "password" ? (
          <button
            className="absolute translate-y-1/2 right-3 bottom-1/2 focus:outline-primary focus-within:outline"
            onClick={toggleState}
            type="button"
          >
            {inputType === "password" ? (
              <AiOutlineEye className="text-2xl focus:outline-primary text-primary" />
            ) : (
              <AiOutlineEyeInvisible className="text-2xl focus:outline-primary text-primary" />
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
      <p className="text-xs text-red-500 font-roboto">
        {errors[name]?.message?.toString()}
      </p>
    </div>
  );
};
