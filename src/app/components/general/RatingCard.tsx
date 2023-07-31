"use client";

import { ComponentProps, useEffect, useState } from "react";
import { Rating } from "./Rating";
import { api } from "@/app/services/api";
import { IUser } from "@/app/interfaces";

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
          src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
        />
        <Rating>{Number(rating)}</Rating>
      </div>
      <p className="font-roboto">{props.children}</p>
      <span className="text-2xl font-bold tracking-wide font-poppins">
        {userName}
      </span>
    </li>
  );
};
