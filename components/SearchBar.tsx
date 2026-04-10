"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function SearchBar({
  onSearch,
  isLoading,
  initialQuery = "",
}: {
  onSearch: (q: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);

  // Update query when initialQuery changes (for when coming back from movie page)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative group">
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-0 group-focus-within:opacity-100 transition duration-300 blur-sm"></div>

      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon
            className={`w-5 h-5 transition-colors duration-300 ${
              query ? "text-primary-500" : "text-gray-400"
            }`}
          />
        </div>

        {/* Input Field */}
        <input
          className="w-full pl-12 pr-32 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-500 dark:focus:border-primary-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl text-base font-medium"
          placeholder="Search movies by title, genre, or actor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-24 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Search hint */}
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        💡 Try searching for Inception, Breaking Bad, or Friends
      </div>
    </div>
  );
}