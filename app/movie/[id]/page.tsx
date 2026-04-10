import { getMovie } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  StarIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const movie = await getMovie(id);

  // Handle movie not found
  if (!movie) {
    notFound();
  }

  // Format rating
  const rating = movie.rating?.average;
  const ratingPercentage = rating ? (rating / 10) * 100 : null;

  // Format year from premiered date
  const year = movie.premiered ? new Date(movie.premiered).getFullYear() : null;

  // Format premiered date nicely
  const formattedDate = movie.premiered
    ? new Date(movie.premiered).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Back to Search
          </span>
        </Link>

        {/* Movie Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Poster Image */}
            <div className="lg:w-1/3 relative bg-gradient-to-br from-purple-600 to-cyan-600">
              {movie.image?.medium ? (
                <div className="relative overflow-hidden">
                  <img
                    src={movie.image.medium}
                    alt={movie.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full h-[400px] lg:h-full flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <FilmIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No poster available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Movie Details */}
            <div className="lg:w-2/3 p-6 sm:p-8 lg:p-10">
              {/* Title Section */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  {movie.name}
                </h1>
              </div>

              {/* Rating and Year Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                {/* Rating */}
                {rating && rating > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-6 h-6 text-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /10
                      </span>
                    </div>

                    {/* Rating Progress Bar */}
                    {ratingPercentage && (
                      <div className="hidden sm:block w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000"
                          style={{ width: `${ratingPercentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}

                {/* Year */}
                {year && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="w-5 h-5" />
                    <span className="font-medium">{year}</span>
                  </div>
                )}

                {/* ID Badge */}
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                  <TagIcon className="w-4 h-4" />
                  <span className="text-sm">ID: {movie.id}</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Genres
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold rounded-full shadow-md"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Premiered Date */}
              {formattedDate && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Release Date
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formattedDate}
                  </p>
                </div>
              )}

              {/* Summary */}
              {movie.summary && (
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <DocumentTextIcon className="w-4 h-4" />
                    Synopsis
                  </h2>
                  <div
                    className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-3 [&_a]:text-primary-500 [&_a]:hover:text-primary-600"
                    dangerouslySetInnerHTML={{ __html: movie.summary }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
