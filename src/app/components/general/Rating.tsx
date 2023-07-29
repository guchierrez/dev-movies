import { ComponentProps } from "react";
import { BsStar } from "react-icons/bs";
import { tv, VariantProps } from "tailwind-variants";

const rating = tv({
  base: "flex gap-2 items-center",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
});

export type RatingProps = ComponentProps<"div"> & VariantProps<typeof rating>;

export const Rating = ({ size, className, ...props }: RatingProps) => {
  return (
    <div className={rating({ size, className })} {...props}>
      <BsStar className="text-primary " />
      <span className="font-bold font-poppins">
        {Number(props.children).toFixed(1)}
      </span>
    </div>
  );
};
