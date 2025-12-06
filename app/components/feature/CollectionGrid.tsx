'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Film, Search, Grid3x3, List, ChevronLeft, ChevronRight } from 'lucide-react';

interface Collection {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    parts?: any[];
}

interface CollectionGridProps {
    initialCollections: Collection[];
    initialTotalPages: number;
    initialTotalResults: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function CollectionGrid({ initialCollections, initialTotalPages, initialTotalResults }: CollectionGridProps) {
    const [collections, setCollections] = useState<Collection[]>(initialCollections);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalResults, setTotalResults] = useState(initialTotalResults);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/' && document.activeElement !== searchInputRef.current) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Fetch collections when page changes or searching
    useEffect(() => {
        const fetchCollections = async () => {
            // Don't fetch on initial load if we have initialCollections on page 1
            if (currentPage === 1 && !searchQuery && initialCollections.length > 0) {
                setCollections(initialCollections);
                return;
            }

            setLoading(true);
            try {
                if (searchQuery.trim()) {
                    // User is searching - use search API
                    const res = await fetch(
                        `${BASE_URL}/search/collection?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
                    );
                    if (res.ok) {
                        const data = await res.json();
                        setTotalPages(Math.min(data.total_pages, 500));
                        setTotalResults(data.total_results);

                        // Fetch full details for each collection to get parts count
                        const detailsPromises = (data.results || []).map(async (collection: Collection) => {
                            try {
                                const detailRes = await fetch(
                                    `${BASE_URL}/collection/${collection.id}?api_key=${API_KEY}`
                                );
                                if (detailRes.ok) {
                                    return detailRes.json();
                                }
                                return collection;
                            } catch {
                                return collection;
                            }
                        });

                        const collectionsWithDetails = await Promise.all(detailsPromises);
                        setCollections(collectionsWithDetails);
                    }
                } else {
                    // No search - fetch collections from top rated movies (sorted by rating)
                    const seenIds = new Set<number>();
                    const newCollections: Collection[] = [];

                    // Calculate which top rated movies pages to fetch based on current page
                    const startPage = (currentPage - 1) * 5 + 1;

                    for (let page = startPage; page <= startPage + 4 && newCollections.length < 20; page++) {
                        const moviesRes = await fetch(
                            `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
                        );
                        if (!moviesRes.ok) continue;
                        const moviesData = await moviesRes.json();

                        // Get movie details for each movie
                        for (const movie of moviesData.results || []) {
                            const detailRes = await fetch(
                                `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
                            );
                            if (!detailRes.ok) continue;
                            const movieDetail = await detailRes.json();

                            if (movieDetail.belongs_to_collection && !seenIds.has(movieDetail.belongs_to_collection.id)) {
                                seenIds.add(movieDetail.belongs_to_collection.id);

                                // Get full collection details
                                const collectionRes = await fetch(
                                    `${BASE_URL}/collection/${movieDetail.belongs_to_collection.id}?api_key=${API_KEY}`
                                );
                                if (collectionRes.ok) {
                                    const collectionDetail = await collectionRes.json();
                                    newCollections.push(collectionDetail);

                                    if (newCollections.length >= 20) break;
                                }
                            }
                        }
                    }

                    setCollections(newCollections);
                    // Keep the total pages/results from initial load
                }
            } catch (error) {
                console.error('Failed to fetch collections:', error);
            }
            setLoading(false);
        };

        fetchCollections();
    }, [currentPage, searchQuery, initialCollections]);

    const scrollToSection = () => {
        if (sectionRef.current) {
            const navbarHeight = 80;
            const elementTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementTop - navbarHeight, behavior: 'smooth' });
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            scrollToSection();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            scrollToSection();
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen w-full bg-background">
            {/* Header Section with Gradient */}
            <div className="relative w-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 -mt-[72px] pt-[72px]">
                <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                <div className="relative mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-12">
                    {/* Title */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
                            <Film className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Movie Collections
                        </h1>
                        <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                            Discover amazing movie and TV collections from your favorite franchises and series
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mx-auto mb-6 max-w-3xl">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <input
                                ref={searchInputRef}
                                placeholder="Search collections... (Press / to focus)"
                                className="w-full rounded-2xl border border-input bg-background/95 py-4 pl-14 pr-20 text-base text-foreground placeholder-muted-foreground shadow-lg backdrop-blur-sm transition-all duration-200 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <kbd className="rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground">/</kbd>
                            </div>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex justify-center">
                        <div className="flex rounded-xl bg-background/60 p-1 backdrop-blur-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${viewMode === 'grid'
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Grid3x3 className="mr-1.5 inline h-4 w-4" />
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${viewMode === 'list'
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <List className="mr-1.5 inline h-4 w-4" />
                                List
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collections Grid */}
            <div ref={sectionRef} className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Section Info - Matching the reference image */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground">All Collections</h2>
                    <p className="mt-1 text-muted-foreground">
                        Page {currentPage} of {totalPages} • {totalResults.toLocaleString()} total collections • {collections.length} loaded
                    </p>
                </div>

                {/* Grid */}
                <div className={`mb-12 grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                    } ${loading ? 'opacity-50' : ''}`}>
                    {collections.map((collection, index) => (
                        <Link
                            key={collection.id}
                            href={`/collection/${collection.id}`}
                            className="transform cursor-pointer transition-all duration-500 ease-out w-full space-y-2 group"
                            data-testid="collection-card"
                        >
                            {/* Card Image */}
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border border-white/10 bg-background/50 shadow transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                                {collection.backdrop_path ? (
                                    <Image
                                        alt={collection.name}
                                        src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                ) : collection.poster_path ? (
                                    <Image
                                        alt={collection.name}
                                        src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted/30">
                                        <Film className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                )}
                            </div>

                            {/* Card Info */}
                            <div className="space-y-1.5">
                                <div className="flex items-start justify-between gap-1">
                                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                        {collection.name}
                                    </span>
                                    {collection.parts && collection.parts.length > 0 && (
                                        <div className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                            {collection.parts.length}
                                        </div>
                                    )}
                                </div>
                                {collection.overview && (
                                    <p className="line-clamp-3 text-xs text-muted-foreground">
                                        {collection.overview}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination - Following movie/tv/anime page style */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage === 1
                            ? 'bg-zinc-900/50 text-gray-600 cursor-not-allowed'
                            : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{currentPage}</span>
                        <span className="text-sm text-gray-500">of</span>
                        <span className="text-sm text-gray-400">{totalPages}</span>
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentPage >= totalPages
                            ? 'bg-zinc-900/50 text-gray-600 cursor-not-allowed'
                            : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
