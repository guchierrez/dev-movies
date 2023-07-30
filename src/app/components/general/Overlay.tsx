"use client";

import { useEffect, useState } from "react";

interface OverlayProps {
  image: string;
}

export const Overlay = ({ image }: OverlayProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 left-0 z-10 w-full h-full transition-all duration-1000 overlay ${
          loading ? "opacity-0" : "opacity-100"
        } `}
      ></div>
      <img
        className={`object-cover w-full h-full transition-transform duration-1000  ${
          loading ? "scale-110" : "scale-[115%]"
        } `}
        src={image}
      />
    </>
  );
};
