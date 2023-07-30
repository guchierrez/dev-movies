import { ComponentProps, ElementType } from "react";

export type ReviewButtonProps = ComponentProps<"button"> & {
  Icon: ElementType;
};

export const ReviewButton = ({ Icon, ...props }: ReviewButtonProps) => {
  return (
    <button {...props}>
      <Icon className="text-primary text-xl" />
    </button>
  );
};
