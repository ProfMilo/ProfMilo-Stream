import CollectionGrid from "../components/feature/CollectionGrid";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTopRatedMovies(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return { results: [], total_pages: 0 };
        return res.json();
    } catch (error) {
        console.error('Failed to fetch top rated movies', error);
        return { results: [], total_pages: 0 };
    }
}

async function getMovieDetails(movieId: number) {
    try {
        const res = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

async function getCollectionDetails(collectionId: number) {
    try {
        const res = await fetch(
            `${BASE_URL}/collection/${collectionId}?api_key=${API_KEY}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

async function searchCollections(query: string, page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/search/collection?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return { results: [], total_pages: 0, total_results: 0 };
        return res.json();
    } catch (error) {
        return { results: [], total_pages: 0, total_results: 0 };
    }
}

export default async function CollectionPage() {
    // Get collections from top rated movies (sorted by rating)
    const seenCollectionIds = new Set<number>();
    const collections: any[] = [];

    // Fetch multiple pages of top rated movies to get enough collections
    for (let page = 1; page <= 5 && collections.length < 20; page++) {
        const topRatedMovies = await getTopRatedMovies(page);

        // Get movie details and extract collection info
        const movieDetailsPromises = (topRatedMovies.results || []).map((movie: any) =>
            getMovieDetails(movie.id)
        );
        const moviesWithDetails = await Promise.all(movieDetailsPromises);

        // Extract unique collections
        for (const movie of moviesWithDetails) {
            if (movie?.belongs_to_collection && !seenCollectionIds.has(movie.belongs_to_collection.id)) {
                seenCollectionIds.add(movie.belongs_to_collection.id);

                // Get full collection details (with parts)
                const collectionDetails = await getCollectionDetails(movie.belongs_to_collection.id);
                if (collectionDetails) {
                    collections.push(collectionDetails);
                }

                if (collections.length >= 20) break;
            }
        }
    }

    // Get total count from search API for stats (use 'a' for broader results)
    const searchData = await searchCollections('a', 1);

    return (
        <div className="min-h-screen bg-background">
            <CollectionGrid
                initialCollections={collections}
                initialTotalPages={Math.min(searchData.total_pages || 347, 500)}
                initialTotalResults={searchData.total_results || 6928}
            />
        </div>
    );
}
