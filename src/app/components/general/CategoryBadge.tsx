import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const badge = tv({
  base: "bg-primary select-none flex items-center justify-center text-primary-content w-fit rounded-full font-poppins font-black tracking-wide normal-case",
  variants: {
    size: {
      sm: "h-6 min-w-[4.5rem] text-xs",
      md: "h-8 min-w-[6rem] text-md",
      lg: "h-10 min-w-[7rem] text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CategoryBadgeProps = ComponentProps<"div"> &
  VariantProps<typeof badge>;

export const CategoryBadge = ({
  size,
  className,
  ...props
}: CategoryBadgeProps) => {
  return (
    <div className={badge({ size, className })}>
      <span className="px-4">{props.children}</span>
    </div>
  );
};
