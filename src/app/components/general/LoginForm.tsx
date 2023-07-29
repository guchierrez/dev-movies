"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { FormTextInput } from "./FormTextInput";
import { LoginFormSchema, TLoginFormValues } from "@/app/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMovieStore } from "@/app/store/UseMovieStore";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userLogin } = useMovieStore((store) => store);
  const router = useRouter();

  const submit = (formData: TLoginFormValues) => {
    userLogin(formData, setLoading, () => router.push("/"));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-7">
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
      <div className="flex flex-col items-center gap-2">
        <Button
          loading={loading}
          disabled={loading}
          size="md"
          buttonType="primary"
          className="w-full"
        >
          Entrar
        </Button>
        <span className="text-sm text-white font-roboto">ou</span>
        <Button type="button" size="sm" className="text-primary">
          <Link href="/register">Cadastre-se</Link>
        </Button>
      </div>
    </form>
  );
};
