import Link from "next/link";
import { Show } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Show }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border rounded p-2 hover:shadow">
        {movie.image && (
          <img src={movie.image.medium} alt={movie.name} />
        )}
        <h2>{movie.name}</h2>
        <h2>{movie.id}</h2>
        <p>{movie.premiered}</p>
      </div>
    </Link>
  );
}