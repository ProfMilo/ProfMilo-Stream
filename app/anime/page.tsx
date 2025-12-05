import HeroSection from "../components/feature/HeroSection";
import AnimeGrid from "../components/feature/AnimeGrid";
import Footer from "../components/layout/Footer";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTrendingAnime() {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return { results: [] };
        return res.json();
    } catch (error) {
        return { results: [] };
    }
}

async function getPopularAnime() {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_count.desc`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return { results: [] };
        return res.json();
    } catch (error) {
        return { results: [] };
    }
}

export default async function AnimePage() {
    let trendingData = { results: [] };
    let popularData = { results: [] };

    try {
        [trendingData, popularData] = await Promise.all([
            getTrendingAnime(),
            getPopularAnime()
        ]);
    } catch (error) {
        console.error('Failed to fetch Anime page data', error);
    }

    // Take the first trending anime as featured
    const featuredAnime = (trendingData.results || []).slice(0, 1).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    const animeList = (popularData.results || []).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredAnime} />
            <AnimeGrid animeList={animeList} />
            <Footer />
        </div>
    );
}
