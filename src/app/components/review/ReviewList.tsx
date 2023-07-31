import { IReview } from "@/app/interfaces";
import { RatingCard } from "../general/RatingCard";

export type ReviewListProps = {
  data: IReview[];
};

export const ReviewList = ({ data }: ReviewListProps) => {
  return (
    <ul className="relative flex flex-col items-center gap-20 py-20 mx-auto md:grid md:gap-5 md:grid-cols-3">
      {data.map(({ description, score, userId }) => (
        <RatingCard key={userId} userId={String(userId)} rating={score}>
          {description}
        </RatingCard>
      ))}
    </ul>
  );
};
