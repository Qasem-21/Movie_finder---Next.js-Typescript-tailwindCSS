import { Show } from "@/types/movie";
import MovieCard from "./MovieCard";
import { FilmIcon } from "@heroicons/react/24/solid";

export default function MovieList({ movies }: { movies: Show[] }) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Results Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full">
          <FilmIcon className="w-4 h-4 text-primary-500" />
          <p className="text-gray-700 dark:text-gray-300">
            Found <span className="font-bold text-primary-500">{movies.length}</span>{" "}
            {movies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>
      </div>
      
      {/* Responsive Grid Layout - NO animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {/* Scroll to top button */}
      {movies.length > 20 && (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}