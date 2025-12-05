'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutPanelLeft, Star, Play } from 'lucide-react';

interface Provider {
    name: string;
    logo: string;
    providerId: number; // TMDB watch provider ID
    isText?: boolean;
}

interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    overview: string;
    genre_ids: number[];
}

// TMDB Watch Provider IDs
const providers: Provider[] = [
    { name: 'Netflix', logo: 'https://img.icons8.com/ios/250/netflix--v1.png', providerId: 8 },
    { name: 'Apple TV+', logo: 'https://img.icons8.com/ios-filled/250/apple-tv.png', providerId: 350 },
    { name: 'Amazon Prime', logo: 'https://img.icons8.com/color/240/amazon-prime.png', providerId: 9 },
    { name: 'Hulu', logo: 'https://img.icons8.com/ios-filled/250/hulu.png', providerId: 15 },
    { name: 'Max', logo: 'https://img.icons8.com/ios-filled/250/hbo-max.png', providerId: 1899 },
    { name: 'Paramount+', logo: 'https://www.paramountplus.com/assets/images/intl-landing-page/pplus_marketing_site_logo_white.png', providerId: 531 },
    { name: 'Disney+', logo: 'https://img.icons8.com/nolan/256/disney-plus.png', providerId: 337 },
    { name: 'Shudder', logo: '', isText: true, providerId: 99 },
];

const genreMap: Record<number, string> = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality',
    10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};

export default function StreamingProvidersSection() {
    const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
    const [selectedProvider, setSelectedProvider] = useState<Provider>(providers[0]);
    const [content, setContent] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {
        async function fetchContent() {
            setLoading(true);
            try {
                const mediaType = activeTab === 'movies' ? 'movie' : 'tv';
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&with_watch_providers=${selectedProvider.providerId}&watch_region=US&sort_by=popularity.desc`
                );
                if (res.ok) {
                    const data = await res.json();
                    setContent(data.results || []);
                }
            } catch (error) {
                console.error('Failed to fetch content:', error);
                setContent([]);
            }
            setLoading(false);
        }

        if (API_KEY) {
            fetchContent();
        }
    }, [selectedProvider, activeTab, API_KEY]);

    const getYear = (item: MediaItem) => {
        const date = item.release_date || item.first_air_date;
        return date ? new Date(date).getFullYear() : '';
    };

    const getGenre = (item: MediaItem) => {
        return item.genre_ids?.[0] ? genreMap[item.genre_ids[0]] || 'Unknown' : 'Unknown';
    };

    return (
        <section className="py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <div>
                    <h1 className="flex items-center text-xl font-bold sm:text-2xl md:text-3xl">
                        <LayoutPanelLeft className="mr-2 inline-block h-6 w-6" />
                        Streaming Providers
                    </h1>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                        Browse content from your favorite streaming services
                    </p>
                </div>

                {/* Tab Buttons */}
                <div className="flex-shrink-0">
                    <div className="inline-flex h-8 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground sm:h-9">
                        <button
                            type="button"
                            onClick={() => setActiveTab('movies')}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all sm:text-sm ${activeTab === 'movies'
                                    ? 'bg-background text-foreground shadow'
                                    : 'hover:bg-background/50'
                                }`}
                        >
                            Movies
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('tv')}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all sm:text-sm ${activeTab === 'tv'
                                    ? 'bg-background text-foreground shadow'
                                    : 'hover:bg-background/50'
                                }`}
                        >
                            TV Shows
                        </button>
                    </div>
                </div>
            </div>

            {/* Provider Grid */}
            <div className="mb-12">
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10">
                    {providers.map((provider) => (
                        <div
                            key={provider.name}
                            onClick={() => setSelectedProvider(provider)}
                            className={`group flex h-12 cursor-pointer flex-col items-center justify-center rounded-xl border transition-all duration-300 md:h-24 ${selectedProvider.name === provider.name
                                    ? 'border-primary bg-primary/10 shadow-lg'
                                    : 'border-white/5 bg-black/10 hover:border-primary/50 hover:bg-black/20 hover:shadow-md'
                                }`}
                        >
                            <div className="relative flex h-8 w-8 items-center justify-center md:h-14 md:w-14">
                                {provider.isText ? (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
                                        <span className="text-[8px] font-bold uppercase text-muted-foreground sm:text-sm md:text-base lg:text-base">
                                            {provider.name}
                                        </span>
                                    </div>
                                ) : (
                                    <Image
                                        alt={provider.name}
                                        src={provider.logo}
                                        width={48}
                                        height={48}
                                        className="object-contain opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 brightness-0 invert"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div>
                <h2 className="mb-6 text-2xl font-bold">
                    {selectedProvider.name} {activeTab === 'movies' ? 'Movies' : 'TV Shows'}
                </h2>

                {loading ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-video w-full rounded-xl bg-muted/30"></div>
                                <div className="mt-2 h-4 w-3/4 rounded bg-muted/30"></div>
                                <div className="mt-1 h-3 w-1/2 rounded bg-muted/30"></div>
                            </div>
                        ))}
                    </div>
                ) : content.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {content.slice(0, 10).map((item) => (
                            <Link
                                key={item.id}
                                href={`/${activeTab === 'movies' ? 'movie' : 'tv'}/${item.id}`}
                                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-card/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
                                    {item.backdrop_path ? (
                                        <Image
                                            alt={item.title || item.name || ''}
                                            src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-muted/30">
                                            <span className="text-muted-foreground">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>

                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="rounded-full bg-primary/90 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                                            <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
                                        </div>
                                    </div>

                                    {/* Rating badge */}
                                    <div className="absolute right-2 top-2">
                                        <div className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground shadow">
                                            <Star className="mr-1 h-3 w-3 fill-current" />
                                            {item.vote_average.toFixed(1)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-3">
                                    <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-primary">
                                        {item.title || item.name}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <p className="text-xs text-muted-foreground">{getYear(item)}</p>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{getGenre(item)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">
                        No content available for {selectedProvider.name}.
                    </p>
                )}
            </div>
        </section>
    );
}
