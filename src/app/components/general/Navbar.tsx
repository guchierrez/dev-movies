"use client";

import Link from "next/link";
import { ComponentProps, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BiUserCircle } from "react-icons/bi";
import { useMovieStore } from "@/app/store/UseMovieStore";
import { UnloggedUser } from "./UnloggedUser";
import { LoggedUser } from "./LoggedUser";
import { LogoutButton } from "./LogoutButton";

export type NavbarProps = ComponentProps<"div">;

export const Navbar = ({ ...props }: NavbarProps) => {
  const { userInfo, autoLogin, user } = useMovieStore((store) => store);

  useEffect(() => {
    autoLogin(userInfo);
  }, []);

  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") {
    return props.children;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="absolute top-0 z-30 justify-between w-5/6 mx-auto overflow-hidden translate-x-1/2 lg:w-2/3 navbar right-1/2">
        <button className="justify-self-start w-fit">
          <Link
            href="/"
            className="flex-1 px-2 mx-2 font-bold tracking-widest select-none font-poppins"
          >
            devmovies
          </Link>
        </button>
        <div className="flex-none lg:hidden">
          {user !== undefined ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <BiUserCircle className="text-2xl text-primary" />
            </Link>
          )}
        </div>
        <div className="flex-none hidden lg:block">
          {user === undefined ? <UnloggedUser /> : <LoggedUser />}
        </div>
      </div>
      {props.children}
    </div>
  );
};
