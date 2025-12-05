import HeroSection from "./components/feature/HeroSection";
import TopMoviesSection from "./components/feature/TopMoviesSection";
import TopTvShowsSection from "./components/feature/TopTvShowsSection";
import StreamingProvidersSection from "./components/feature/StreamingProvidersSection";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTrendingMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return res.json();
  } catch (error) {
    return { results: [] };
  }
}

async function getTopRatedMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return res.json();
  } catch (error) {
    return { results: [] };
  }
}

async function getTopRatedTvShows() {
  try {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { results: [] };
    return res.json();
  } catch (error) {
    return { results: [] };
  }
}

export default async function Home() {
  let trendingData = { results: [] };
  let topMoviesData = { results: [] };
  let topTvData = { results: [] };

  try {
    [trendingData, topMoviesData, topTvData] = await Promise.all([
      getTrendingMovies(),
      getTopRatedMovies(),
      getTopRatedTvShows()
    ]);
  } catch (error) {
    console.error('Failed to fetch home page data', error);
    // Continue rendering with empty data
  }

  // Ensure we have data and map it correctly
  const featuredMovies = (trendingData.results || []).slice(0, 6).map((m: any) => ({
    ...m,
    media_type: 'movie'
  }));

  const topMovies = (topMoviesData.results || []).map((m: any) => ({
    ...m,
    media_type: 'movie'
  }));

  const topTvShows = (topTvData.results || []).map((t: any) => ({
    ...t,
    media_type: 'tv'
  }));

  return (
    <div className="min-h-screen bg-background">
      <HeroSection featuredMovies={featuredMovies} />
      <TopMoviesSection movies={topMovies} />
      <TopTvShowsSection tvShows={topTvShows} />
      <div className="container mx-auto px-4 max-w-7xl">
        <StreamingProvidersSection />
      </div>
    </div>
  );
}
