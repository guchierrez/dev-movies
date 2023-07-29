import Link from "next/link";
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const title = tv({
  base: "font-bold tracking-wide font-poppins",
  variants: {
    size: {
      sm: "text-lg",
      md: "text-3xl",
      lg: "text-4xl",
    },
  },
});

export type MovieTitleProps = ComponentProps<typeof Link> &
  VariantProps<typeof title>;

export const MovieTitle = ({ size, className, ...props }: MovieTitleProps) => {
  return (
    <Link {...props} className={title({ size })}>
      {props.children}
    </Link>
  );
};
