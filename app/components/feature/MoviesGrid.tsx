'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Calendar, Clock, TrendingUp, Search, Download, Share2, LayoutGrid, Film, Tv, MonitorPlay } from 'lucide-react';

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
    { id: 'popular', label: 'Popular', icon: Star },
    { id: 'now_playing', label: 'Now Playing', icon: MonitorPlay },
    { id: 'top_rated', label: 'Top Rated', icon: TrendingUp },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
];

export default function MoviesGrid({ movies }: MoviesGridProps) {
    const [activeFilter, setActiveFilter] = useState('popular');

    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-white text-black scale-105'
                                    : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                        <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Popular Movies</h2>
                        <p className="text-xs text-gray-400">Most loved by community</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            className="group relative bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                        >
                            <div className="aspect-[2/3] relative overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <MonitorPlay className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-bold text-white">{movie.vote_average.toFixed(1)}</span>
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

                {/* Pagination / Navigation (Bottom) */}
                <div className="flex items-center justify-center gap-4 mt-12">
                    <button className="p-2 rounded-lg bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors">
                        &lt; Previous
                    </button>
                    <span className="text-sm font-medium text-white">1</span>
                    <span className="text-sm text-gray-500">...</span>
                    <button className="p-2 rounded-lg bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors">
                        Next &gt;
                    </button>
                </div>
            </div>
        </section>
    );
}
