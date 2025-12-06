'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, Clock, TrendingUp, MonitorPlay, ChevronLeft, ChevronRight } from 'lucide-react';

interface Anime {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    first_air_date?: string;
    media_type: 'tv';
}

interface AnimeGridProps {
    animeList: Anime[];
}

const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp, description: 'Trending anime right now' },
    { id: 'popular', label: 'Popular', icon: Star, description: 'Most popular anime' },
    { id: 'recent', label: 'Recent', icon: Clock, description: 'Recently aired anime' },
];

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function AnimeGrid({ animeList: initialAnimeList }: AnimeGridProps) {
    const [activeFilter, setActiveFilter] = useState('trending');
    const [animeList, setAnimeList] = useState<Anime[]>(initialAnimeList);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const currentFilterInfo = filters.find(f => f.id === activeFilter) || filters[0];
    const Icon = currentFilterInfo.icon;

    useEffect(() => {
        async function fetchAnime() {
            setLoading(true);
            try {
                let url = '';

                if (activeFilter === 'trending') {
                    // Trending anime - use discover with popularity sorting
                    url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=${currentPage}`;
                } else if (activeFilter === 'popular') {
                    // Popular anime - discover with vote count sorting
                    url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_count.desc&page=${currentPage}`;
                } else if (activeFilter === 'recent') {
                    // Recent anime - discover with first air date sorting
                    url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=first_air_date.desc&page=${currentPage}`;
                }

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    const results = data.results || [];

                    setAnimeList(results.map((t: any) => ({ ...t, media_type: 'tv' })));
                    setTotalPages(Math.min(data.total_pages, 500));
                }
            } catch (error) {
                console.error('Failed to fetch anime:', error);
            }
            setLoading(false);
        }

        fetchAnime();
    }, [activeFilter, currentPage]);

    const handleFilterChange = (filterId: string) => {
        if (filterId !== activeFilter) {
            setActiveFilter(filterId);
            setCurrentPage(1);
        }
    };

    const scrollToSection = () => {
        if (sectionRef.current) {
            const navbarHeight = 48;
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

    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {filters.map((filter) => {
                        const FilterIcon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => handleFilterChange(filter.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-white text-black scale-105'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
                                    }`}
                            >
                                <FilterIcon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {/* Section Header */}
                <div ref={sectionRef} className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{currentFilterInfo.label} Anime</h2>
                        <p className="text-xs text-gray-400">{currentFilterInfo.description}</p>
                    </div>
                </div>

                {/* Grid */}
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ${loading ? 'opacity-50' : ''}`}>
                    {animeList.map((anime) => (
                        <Link
                            key={anime.id}
                            href={`/tv/${anime.id}`}
                            className="group relative bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                        >
                            <div className="aspect-[2/3] relative overflow-hidden">
                                {anime.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                                        alt={anime.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                        <MonitorPlay className="w-12 h-12 text-zinc-600" />
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <MonitorPlay className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-bold text-white">{anime.vote_average.toFixed(1)}</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-white truncate group-hover:text-primary transition-colors">
                                    {anime.name}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-400">
                                        {anime.first_air_date ? new Date(anime.first_air_date).getFullYear() : 'Anime'}
                                    </span>
                                    <span className="text-xs border border-zinc-700 px-1.5 py-0.5 rounded text-gray-400">TV</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mt-12">
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
        </section>
    );
}
