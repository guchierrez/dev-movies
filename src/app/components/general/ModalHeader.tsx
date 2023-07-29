import { ReturnButton } from "./ReturnButton";
import { ComponentProps } from "react";

export type ModalHeaderProps = ComponentProps<"div"> & {
  title: string;
};

export const ModalHeader = ({ title, ...props }: ModalHeaderProps) => {
  return (
    <div {...props} className="flex justify-between">
      <h1 className="font-poppins text-3xl tracking-wide font-bold">{title}</h1>
      <ReturnButton href="/" />
    </div>
  );
};
