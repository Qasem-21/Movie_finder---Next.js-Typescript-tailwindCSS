import { getMovie } from "@/lib/api";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl">{movie.name}</h1>

      {movie.image && <img src={movie.image.medium} />}

      <p dangerouslySetInnerHTML={{ __html: movie.summary || "no description available" }} />

      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Rating: {movie.rating?.average}</p>
    </div>
  );
}
