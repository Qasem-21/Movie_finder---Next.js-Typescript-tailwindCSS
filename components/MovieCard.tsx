import Link from "next/link";
import { Show } from "@/types/movie";
import { StarIcon, CalendarIcon, FilmIcon } from "@heroicons/react/24/solid";

export default function MovieCard({ movie }: { movie: Show }) {
  // Format rating
  const rating = movie.rating?.average;
  
  // Format year from premiered date
  const year = movie.premiered ? new Date(movie.premiered).getFullYear() : null;
  
  // Get first two genres
  const displayGenres = movie.genres?.slice(0, 2) || [];
  const hasMoreGenres = movie.genres?.length > 2;

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
        
        {/* Poster Image Container */}
        <div className="relative overflow-hidden aspect-[2/3] bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
          {movie.image?.medium ? (
            <img 
              src={movie.image.medium} 
              alt={movie.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <FilmIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No poster</p>
              </div>
            </div>
          )}
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Rating Badge */}
          {rating && rating > 0 && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <StarIcon className="w-3 h-3 text-yellow-500" />
              <span className="text-white text-xs font-bold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
            {movie.name}
          </h2>
          
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            {year && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                <span>{year}</span>
              </div>
            )}
            <span className="text-xs">ID: {movie.id}</span>
          </div>
          
          {/* Genres */}
          {displayGenres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayGenres.map((genre) => (
                <span 
                  key={genre}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {genre}
                </span>
              ))}
              {hasMoreGenres && (
                <span className="text-xs px-2 py-0.5 text-gray-500 dark:text-gray-400">
                  +{movie.genres.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* View Details Button (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
          <span className="block text-center text-white text-sm font-semibold">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}