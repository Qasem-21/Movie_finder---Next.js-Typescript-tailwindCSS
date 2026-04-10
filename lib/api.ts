import { Show } from "@/types/movie";

const SEARCH_URL = process.env.NEXT_PUBLIC_TVMAZE_SEARCH_URL || 'https://api.tvmaze.com/search/shows';
const SHOW_URL = process.env.NEXT_PUBLIC_TVMAZE_SHOW_URL || 'https://api.tvmaze.com/shows';

export async function searchMovies(query: string): Promise<Show[]> {
  const res = await fetch(`${SEARCH_URL}?q=${query}`);

  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.statusText}`);
  }

  const data = await res.json();
  return data.map((item: any) => item.show);
}

export async function getMovie(id: string): Promise<Show> {
  console.log(`Fetching movie with ID: ${id}`);
  const res = await fetch(`${SHOW_URL}/${id}`);
  
  if (!res.ok) {
    throw new Error(`Failed to get movie: ${res.statusText}`);
  }
  
  return res.json();
}