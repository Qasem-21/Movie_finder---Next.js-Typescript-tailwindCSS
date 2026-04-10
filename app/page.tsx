import Loader from "@/components/Loader";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { searchMovies } from "@/lib/api";

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
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </main>
  );
}
