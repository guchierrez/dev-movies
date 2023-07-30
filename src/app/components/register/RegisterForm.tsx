"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  TRegisterFormValues,
} from "@/app/schema/RegisterSchema";
import { Button } from "../general/Button";
import { FormTextInput } from "../general/FormTextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMovieStore } from "@/app/store/UseMovieStore";

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
  });
  const { userRegister } = useMovieStore((store) => store);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const submit = (formData: TRegisterFormValues) => {
    userRegister(formData, setLoading, () => router.push("/"));
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-5 lg:grid lg:grid-cols-2"
    >
      <FormTextInput
        errors={errors}
        register={register}
        name="name"
        placeholder="Nome"
        type="text"
      />
      <FormTextInput
        errors={errors}
        register={register}
        name="email"
        placeholder="Email"
        type="text"
      />
      <FormTextInput
        errors={errors}
        register={register}
        name="password"
        placeholder="Senha"
        type="password"
      />
      <FormTextInput
        errors={errors}
        register={register}
        name="confirm"
        placeholder="Confirmar senha"
        type="password"
      />
      <Button
        size="md"
        buttonType="primary"
        className="self-end w-40 lg:col-start-2 lg:justify-self-end"
        type="submit"
        loading={loading}
        disabled={loading}
      >
        Cadastrar-se
      </Button>
    </form>
  );
};
