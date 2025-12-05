import CollectionGrid from "../components/feature/CollectionGrid";
import Footer from "../components/layout/Footer";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Curated list of collection IDs to match the design
const COLLECTION_IDS = [
    10,     // Star Wars
    2190,   // Indiana Jones
    119,    // Lord of the Rings
    263,    // Three Colors
    1575,   // Star Trek: The Original Series
    230,    // The Godfather
    264,    // The Dark Knight
    238,    // Back to the Future
    295,    // Pirates of the Caribbean
    9737,   // Ocean's
    328,    // Jurassic Park
    135934, // Predator
    2150,   // Chronicles of Narnia
    2284,   // Cube
    4003,   // Sissi
    33514,  // Shaft
    528,    // Terminator
    529,    // Wallace & Gromit
    556,    // Spider-Man
    645     // James Bond
];

async function getCollectionDetails(id: number) {
    try {
        const res = await fetch(`${BASE_URL}/collection/${id}?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error(`Failed to fetch collection ${id}`, error);
        return null;
    }
}

export default async function CollectionPage() {
    let collectionsResults: any[] = [];

    try {
        const collectionsPromises = COLLECTION_IDS.map(id => getCollectionDetails(id));
        collectionsResults = await Promise.all(collectionsPromises);
    } catch (error) {
        console.error('Failed to fetch collections', error);
    }

    // Filter out any failed fetches
    const collections = collectionsResults.filter(c => c !== null);

    return (
        <div className="min-h-screen bg-background">
            <CollectionGrid collections={collections} />
            <Footer />
        </div>
    );
}
