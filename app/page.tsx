"use client";
import DarkModeToggle from "@/components/DarkModeToggle";
import Loader from "@/components/Loader";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { searchMovies } from "@/lib/api";
import { Show } from "@/types/movie";
import { useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (q: string) => {
    if (!q) return;
    setLoading(true);
    const data = await searchMovies(q);
    setMovies(data);
    setLoading(false);
  };

  return (
    <main className="p-4">
      <DarkModeToggle/>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </main>
  );
}
