import { ComponentProps } from "react";
import { BsStar } from "react-icons/bs";
import { tv, VariantProps } from "tailwind-variants";

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button>;

const button = tv({
  base: "btn items-center gap-3 flex rounded-full font-poppins font-black tracking-wide normal-case",
  variants: {
    size: {
      sm: "btn-sm min-w-[5rem]",
      md: "btn-md min-w-[5rem]",
      lg: "lg:btn-lg btn-md",
    },
    rating: {
      true: "",
    },
    loading: {
      true: "",
    },
    buttonType: {
      neutral: "",
      primary: "btn-primary",
    },
  },
  defaultVariants: {
    size: "sm",
    rating: false,
    buttonType: "neutral",
    loading: false,
  },
});

export const Button = ({
  size,
  rating,
  buttonType,
  className,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button className={button({ size, buttonType, className })} {...props}>
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <></>
      )}
      {rating ? <BsStar className="text-xl" /> : <></>}
      <span>{props.children}</span>
    </button>
  );
};
