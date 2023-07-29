"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { LogoutButton } from "./LogoutButton";

export const LoggedUser = () => {
  const { user } = useMovieStore((store) => store);
  return (
    <div className="flex gap-3">
      <p className="font-thin tracking-wide font-roboto">
        Bem vindo, <span className="font-bold text-primary">{user?.name}</span>
      </p>
      <LogoutButton />
    </div>
  );
};
