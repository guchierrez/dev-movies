import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const duration = tv({
  base: "font-roboto font-thin tracking-wide text-gray-400",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg",
    },
  },
});

export type MovieDurationProps = ComponentProps<"span"> &
  VariantProps<typeof duration>;

export const MovieDuration = ({
  size,
  className,
  ...props
}: MovieDurationProps) => {
  return (
    <span
      {...props}
      className={duration({ size, className })}
    >{`${props.children}m`}</span>
  );
};
