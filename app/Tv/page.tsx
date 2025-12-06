import HeroSection from "../components/feature/HeroSection";
import TvShowsGrid from "../components/feature/TvShowsGrid";

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

async function getTvImages(id: number) {
    try {
        const res = await fetch(
            `${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`,
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

    // Take the first popular show as featured and fetch its logo
    const firstShow = (popularData.results || [])[0];
    let featuredTvShow: any[] = [];
    if (firstShow) {
        const logo_path = await getTvImages(firstShow.id);
        featuredTvShow = [{
            ...firstShow,
            media_type: 'tv' as const,
            logo_path
        }];
    }

    const tvShows = (popularData.results || []).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredTvShow} showArrows={false} showPosters={false} enableAutoTransition={false} />
            <TvShowsGrid tvShows={tvShows} />
        </div>
    );
}
