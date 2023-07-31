import Empty from "@/app/assets/Empty.json";
import Lottie from "lottie-react";

export const EmptyReviewSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie className="h-60" animationData={Empty} />
      <span className="font-bold tracking-wide text-center text-primary font-poppins">
        Não há reviews disponíveis para este filme.
      </span>
    </div>
  );
};
