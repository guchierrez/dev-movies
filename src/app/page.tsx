import { MovieCard } from "./components/general/MovieCard";
import { MovieSection } from "./components/general/MovieSection";
import { api } from "./services/api";
import { IMovie } from "./store/UseMovieStore";

async function getData() {
  try {
    const { data } = await api.get<IMovie[]>("/movies?_embed=reviews");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const movieData = await getData();
  return (
    <main className="flex flex-col w-5/6 min-h-screen gap-10 py-10 pt-16 mx-auto lg:w-2/3">
      {movieData && movieData.length > 0 ? (
        <MovieCard
          category={movieData[0]?.type}
          duration={movieData[0]?.duration}
          image={movieData[0].image}
          rating={movieData[0].reviews.reduce(
            (acc, review) => acc + review.score,
            0
          )}
          title={movieData[0].name}
          id={String(movieData[0].id)}
          size="md"
        />
      ) : (
        <></>
      )}

      <MovieSection
        movieData={
          movieData && movieData.length > 0
            ? movieData.filter((movie) => movie.id !== 1)
            : []
        }
      />
    </main>
  );
}
