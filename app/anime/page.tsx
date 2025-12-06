import HeroSection from "../components/feature/HeroSection";
import AnimeGrid from "../components/feature/AnimeGrid";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTrendingAnime() {
    try {
        // Get trending TV shows and filter for Japanese animation
        const res = await fetch(
            `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return { results: [] };
        const data = await res.json();
        // Filter for Japanese animation (genre 16 = Animation)
        const animeResults = (data.results || []).filter((show: any) =>
            show.origin_country?.includes('JP') && show.genre_ids?.includes(16)
        );
        return { results: animeResults.length > 0 ? animeResults : data.results.filter((show: any) => show.genre_ids?.includes(16)) };
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

    // Take the first trending anime as featured and fetch its logo
    const firstAnime = (trendingData.results || [])[0];
    let featuredAnime: any[] = [];
    if (firstAnime) {
        const logo_path = await getTvImages(firstAnime.id);
        featuredAnime = [{
            ...firstAnime,
            media_type: 'tv' as const,
            logo_path
        }];
    }

    const animeList = (popularData.results || []).map((t: any) => ({
        ...t,
        media_type: 'tv'
    }));

    return (
        <div className="min-h-screen bg-background">
            <HeroSection featuredMovies={featuredAnime} showArrows={false} showPosters={false} enableAutoTransition={false} />
            <AnimeGrid animeList={animeList} />
        </div>
    );
}
