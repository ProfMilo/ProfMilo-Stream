import { notFound } from "next/navigation";
import CollectionHero from "../../components/feature/CollectionHero";
import CollectionContent from "../../components/feature/CollectionContent";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

async function getCollection(id: string) {
    const res = await fetch(`${BASE_URL}/collection/${id}?api_key=${API_KEY}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
}

export default async function CollectionDetailsPage(props: Props) {
    const params = await props.params;
    const { id } = params;
    const collection = await getCollection(id);

    if (!collection) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <CollectionHero collection={collection} />
            <CollectionContent parts={collection.parts} />
        </div>
    );
}
