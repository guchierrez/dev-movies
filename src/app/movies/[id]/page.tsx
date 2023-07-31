import { AddReviewModal } from "@/app/components/add/AddReviewModal";
import { EditReviewModal } from "@/app/components/edit/EditReviewModal";
import { DeleteReviewModal } from "@/app/components/delete/DeleteReviewModal";
import { MovieDetails } from "@/app/components/general/MovieDetails";
import { ReviewSection } from "@/app/components/review/ReviewSection";
import { UserReview } from "@/app/components/user/UserReview";
import { IMovieReviews } from "@/app/interfaces";
import { api } from "@/app/services/api";
import { Overlay } from "@/app/components/general/Overlay";

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

export async function generateMetadata({ params }: PageProps) {
  const id = params.id;
  const { data } = await api.get<IMovieReviews>(
    `/movies/${id}/?_embed=reviews`
  );

  return {
    title: data.name,
    description: data.synopsis,
  };
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
        <Overlay image={movieData.image} />
        <MovieDetails
          category={movieData.type}
          duration={movieData.duration}
          rating={
            movieData.reviews.length === 0
              ? 0
              : movieData.reviews.reduce(
                  (acc, review) => Number(acc) + Number(review.score),
                  0
                ) / movieData.reviews.length
          }
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
        <ReviewSection movieId={id} />
        <AddReviewModal movieId={id} />
        <EditReviewModal movieId={id} />
        <DeleteReviewModal movieId={id} />
      </div>
    </>
  );
}
