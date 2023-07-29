import Link from "next/link";
import { ComponentProps } from "react";
import { BsArrowLeft } from "react-icons/bs";

export type ReturnButtonProps = ComponentProps<typeof Link>;

export const ReturnButton = ({ ...props }: ReturnButtonProps) => {
  return (
    <Link
      {...props}
      className="flex gap-3 items-center hover:span-hover hover:text-primary"
    >
      <BsArrowLeft className="text-xl span-default" />
      <span className="font-poppins tracking-wide font-semibold">Voltar</span>
    </Link>
  );
};
