import { getMovie } from "@/lib/api";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } =await params;



  if (!id) {
    return <p>Invalid movie ID</p>;
  }

  const movie = await getMovie(id);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">{movie.name}</h1>

      {movie.image && <img src={movie.image.medium} />}

      {movie.summary && (
        <div
          dangerouslySetInnerHTML={{ __html: movie.summary }}
        />
      )}

      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Rating: {movie.rating?.average}</p>
    </div>
  );
}