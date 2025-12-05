import HeroSection from "../components/feature/HeroSection";
import MoviesGrid from "../components/feature/MoviesGrid";
import Footer from "../components/layout/Footer";

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

async function getPopularMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
        if (!res.ok) return { results: [] };
        return res.json();
    } catch (error) {
        return { results: [] };
    }
}

export default async function MoviePage() {
    let trendingData = { results: [] };
    let popularData = { results: [] };

    try {
        [trendingData, popularData] = await Promise.all([
            getTrendingMovies(),
            getPopularMovies()
        ]);
    } catch (error) {
        console.error('Failed to fetch Movie page data', error);
    }

    // Take the first trending movie as featured
    const featuredMovie = (trendingData.results || []).slice(0, 1).map((m: any) => ({
        ...m,
        media_type: 'movie'
    }));

    const movies = (popularData.results || []).map((m: any) => ({
        ...m,
        media_type: 'movie'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredMovie} />
            <MoviesGrid movies={movies} />
            <Footer />
        </div>
    );
}
