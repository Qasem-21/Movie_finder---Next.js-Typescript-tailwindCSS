import { Show } from "@/types/movie";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }: { movies: Show[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}