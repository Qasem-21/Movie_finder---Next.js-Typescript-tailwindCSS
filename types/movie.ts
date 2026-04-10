export interface Show {
  id: number;
  name: string;
  image?: {
    medium: string;
  };
  premiered?: string;
  summary?: string;
  genres: string[];
  rating: {
    average: number | null;
  };
}