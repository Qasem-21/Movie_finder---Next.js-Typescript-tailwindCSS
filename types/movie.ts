// Basic movie information for search results
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

// Detailed movie information for single movie page
export interface MovieDetails extends Movie {
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  DVD?: string
  BoxOffice?: string
  Production?: string
  Website?: string
}
// Rating object structure
export interface Rating {
  Source: string
  Value: string
}

// API search response
export interface SearchResponse {
  Search: Movie[]
  totalResults: string
  Response: string
  Error?: string
}

// API movie response
export interface MovieResponse {
  Response: string
  Error?: string
}
