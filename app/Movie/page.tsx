import HeroSection from "../components/feature/HeroSection";
import MoviesGrid from "../components/feature/MoviesGrid";

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

async function getMovieImages(id: number) {
    try {
        const res = await fetch(
            `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const englishLogo = data.logos?.find((l: any) => l.iso_639_1 === 'en');
        return englishLogo?.file_path || data.logos?.[0]?.file_path || null;
    } catch (error) {
        return null;
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

    // Take the first trending movie as featured and fetch its logo
    const firstMovie = (trendingData.results || [])[0];
    let featuredMovie: any[] = [];
    if (firstMovie) {
        const logo_path = await getMovieImages(firstMovie.id);
        featuredMovie = [{
            ...firstMovie,
            media_type: 'movie' as const,
            logo_path
        }];
    }

    const movies = (popularData.results || []).map((m: any) => ({
        ...m,
        media_type: 'movie'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredMovie} showArrows={false} showPosters={false} enableAutoTransition={false} />
            <MoviesGrid movies={movies} />
        </div>
    );
}
