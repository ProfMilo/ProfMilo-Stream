import HeroSection from "../components/feature/HeroSection";
import TvShowsGrid from "../components/feature/TvShowsGrid";
import Footer from "../components/layout/Footer";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTrendingTvShows() {
    try {
        const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
        if (!res.ok) return { results: [] };
        return res.json();
    } catch (error) {
        return { results: [] };
    }
}

async function getPopularTvShows() {
    try {
        const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
        if (!res.ok) return { results: [] };
        return res.json();
    } catch (error) {
        return { results: [] };
    }
}

export default async function TvPage() {
    let trendingData = { results: [] };
    let popularData = { results: [] };

    try {
        [trendingData, popularData] = await Promise.all([
            getTrendingTvShows(),
            getPopularTvShows()
        ]);
    } catch (error) {
        console.error('Failed to fetch TV page data', error);
    }

    // Take the first trending show as featured
    const featuredTvShow = (trendingData.results || []).slice(0, 1).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    const tvShows = (popularData.results || []).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredTvShow} />
            <TvShowsGrid tvShows={tvShows} />
            <Footer />
        </div>
    );
}
