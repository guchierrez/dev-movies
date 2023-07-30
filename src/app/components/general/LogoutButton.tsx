"use client";

import { useMovieStore } from "@/app/store/UseMovieStore";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export const LogoutButton = () => {
  const { userLogout } = useMovieStore((store) => store);
  const router = useRouter();

  return (
    <button onClick={() => userLogout(() => router.refresh())}>
      <FiLogOut className="text-2xl text-primary" />
    </button>
  );
};
