'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, Calendar, TrendingUp, MonitorPlay, ChevronLeft, ChevronRight } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    media_type: 'movie';
}

interface MoviesGridProps {
    movies: Movie[];
}

const filters = [
    { id: 'popular', label: 'Popular', icon: Star, description: 'Most loved by community' },
    { id: 'now_playing', label: 'Now Playing', icon: MonitorPlay, description: 'Currently in theaters' },
    { id: 'top_rated', label: 'Top Rated', icon: TrendingUp, description: 'Highest rated of all time' },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, description: 'Coming soon to theaters' },
];

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MoviesGrid({ movies: initialMovies }: MoviesGridProps) {
    const [activeFilter, setActiveFilter] = useState('popular');
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const currentFilterInfo = filters.find(f => f.id === activeFilter) || filters[0];
    const Icon = currentFilterInfo.icon;

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            try {
                const res = await fetch(
                    `${BASE_URL}/movie/${activeFilter}?api_key=${API_KEY}&page=${currentPage}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setMovies(data.results.map((m: any) => ({ ...m, media_type: 'movie' })));
                    setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
                }
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
            setLoading(false);
        }

        fetchMovies();
    }, [activeFilter, currentPage]);

    const handleFilterChange = (filterId: string) => {
        if (filterId !== activeFilter) {
            setActiveFilter(filterId);
            setCurrentPage(1); // Reset to page 1 when filter changes
        }
    };

    const scrollToSection = () => {
        if (sectionRef.current) {
            const navbarHeight = 48; // Approximate navbar height
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
                        <h2 className="text-xl font-bold text-white">{currentFilterInfo.label} Movies</h2>
                        <p className="text-xs text-gray-400">{currentFilterInfo.description}</p>
                    </div>
                </div>

                {/* Grid */}
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ${loading ? 'opacity-50' : ''}`}>
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            className="group relative bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                        >
                            <div className="aspect-[2/3] relative overflow-hidden">
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-gray-500">
                                        No Image
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <MonitorPlay className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 z-10">
                                    <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-xs font-bold">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-white truncate group-hover:text-primary transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-400">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                    </span>
                                    <span className="text-xs border border-zinc-700 px-1.5 py-0.5 rounded text-gray-400">Movie</span>
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
