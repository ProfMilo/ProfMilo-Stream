'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, List, Calendar, Star, Clock } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
}

interface CollectionContentProps {
    parts: Movie[];
}

export default function CollectionContent({ parts }: CollectionContentProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Sort by release date
    const sortedParts = [...parts].sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Movies in Collection</h2>
                    <p className="text-sm text-gray-400">
                        {parts.length} movies • Sorted by release date
                    </p>
                </div>

                {/* View Toggle */}
                <div className="bg-zinc-900 p-1 rounded-lg flex gap-1 self-start sm:self-auto">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Grid/List */}
            <div className={`grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                    : 'grid-cols-1'
                }`}>
                {sortedParts.map((movie) => (
                    <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className={`group bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                            }`}
                    >
                        {/* Image */}
                        <div className={`relative shrink-0 ${viewMode === 'grid' ? 'aspect-[2/3]' : 'w-32 sm:w-48 aspect-[2/3]'
                            }`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {viewMode === 'grid' && (
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-xs font-bold text-white flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    {movie.vote_average.toFixed(1)}
                                </div>
                            )}
                        </div>

                        {/* Content (List View) */}
                        {viewMode === 'list' && (
                            <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(movie.release_date).getFullYear()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        {movie.vote_average.toFixed(1)}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-3">
                                    {movie.overview}
                                </p>
                            </div>
                        )}

                        {/* Content (Grid View - Minimal) */}
                        {viewMode === 'grid' && (
                            <div className="p-3">
                                <h3 className="font-semibold text-white text-sm truncate group-hover:text-primary transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                                    <span>{new Date(movie.release_date).getFullYear()}</span>
                                </div>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
