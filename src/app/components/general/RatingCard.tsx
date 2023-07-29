"use client";

import { ComponentProps, useEffect, useState } from "react";
import { Rating } from "./Rating";
import { api } from "@/app/services/api";
import { IUser } from "@/app/store/UseMovieStore";

export type RatingCardProps = ComponentProps<"li"> & {
  rating: number;
  userId: string;
};

export const RatingCard = ({ userId, rating, ...props }: RatingCardProps) => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`);
        setUserName(data.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  });

  return (
    <li className="flex flex-col items-center gap-7 w-60">
      <div className="flex flex-col items-center gap-2">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src="https://s2-g1.glbimg.com/KijX0QgEENLEh2xN2h6bEyRnt_4=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/9/e/EYKMBXR72tNdkUAgmZzQ/azul-caneta.jpg"
        />
        <Rating>{rating}</Rating>
      </div>
      <p className="font-roboto">{props.children}</p>
      <span className="text-2xl font-bold tracking-wide font-poppins">
        {userName}
      </span>
    </li>
  );
};
