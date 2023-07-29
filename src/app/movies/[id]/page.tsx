import { AddReviewModal } from "@/app/components/general/AddReviewModal";
import { MovieDetails } from "@/app/components/general/MovieDetails";
import { RatingCard } from "@/app/components/general/RatingCard";
import { ReviewSection } from "@/app/components/general/ReviewSection";
import { UserReview } from "@/app/components/general/UserReview";
import { IMovieReviews } from "@/app/interfaces";
import { api } from "@/app/services/api";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const { data } = await api.get<IMovieReviews[]>("/movies?_embed=reviews");

  return data.map((movie) => ({
    id: String(movie.id),
  }));
}

const fetchData = async (id: string) => {
  try {
    const { data } = await api.get<IMovieReviews>(
      `/movies/${id}?_embed=reviews`
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const movieData = await fetchData(id);

  if (movieData === null || movieData === undefined) return;
  return (
    <>
      <main className="relative overflow-hidden h-[32rem]">
        <div
          data-image
          className="absolute top-0 left-0 z-10 w-full h-full transition-all duration-1000 overlay"
        ></div>
        <img
          className="object-cover w-full h-full scale-110"
          src={movieData.image}
        />
        <MovieDetails
          category={movieData.type}
          duration={movieData.duration}
          rating={movieData.reviews.reduce(
            (acc, review) => acc + review.score,
            0
          )}
          title={movieData.name}
          size="lg"
          id={String(movieData.id)}
          className="absolute z-20 w-5/6 translate-x-1/2 lg:w-2/3 bottom-6 right-1/2"
        />
      </main>
      <div className="w-5/6 min-h-screen py-8 mx-auto lg:w-2/3">
        <p className="leading-7 tracking-wide lg:w-3/4 font-roboto">
          {movieData.synopsis}
        </p>
        <UserReview id={id} />
        <ReviewSection movieData={movieData} />
      </div>
    </>
  );
}
