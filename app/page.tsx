"use client";
import DarkModeToggle from "@/components/DarkModeToggle";
import Loader from "@/components/Loader";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { searchMovies } from "@/lib/api";
import { Show } from "@/types/movie";
import { useState, useEffect } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  // Load saved results when component mounts
  useEffect(() => {
    const savedMovies = localStorage.getItem("lastSearchMovies");
    const savedQuery = localStorage.getItem("lastSearchQuery");

    if (savedMovies && savedQuery) {
      setMovies(JSON.parse(savedMovies));
      setLastQuery(savedQuery);
      setSearched(true);
    }
  }, []);

  const handleSearch = async (q: string) => {
    if (!q) return;

    setLoading(true);
    setSearched(true);
    setLastQuery(q);

    const data = await searchMovies(q);
    setMovies(data);

    // Save to localStorage
    localStorage.setItem("lastSearchMovies", JSON.stringify(data));
    localStorage.setItem("lastSearchQuery", q);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header with Dark Mode Toggle */}
          <div className="flex justify-end mb-8">
            <DarkModeToggle />
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
              Movie Explorer
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover your favorite movies, TV shows, and more
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <SearchBar
              onSearch={handleSearch}
              isLoading={loading}
              initialQuery={lastQuery}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <Loader />
        ) : searched && movies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No movies found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try searching for a different movie or TV show
            </p>
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    </main>
  );
}
