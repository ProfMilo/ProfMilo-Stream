'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, List, Film } from 'lucide-react';

interface Collection {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    parts: any[]; // We might just use the count
}

interface CollectionGridProps {
    collections: Collection[];
}

export default function CollectionGrid({ collections }: CollectionGridProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCollections = collections.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-white">
            {/* Header Section */}
            <div className="pt-12 pb-8 text-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 mb-4">
                    <Film className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Movie Collections</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Discover amazing movie and TV collections from your favorite franchises and series
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mt-8 relative">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search collections... (Press / to focus)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-zinc-800 rounded text-xs text-gray-400">
                            /
                        </div>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="flex justify-center mt-6">
                    <div className="bg-zinc-900 p-1 rounded-lg flex gap-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 pb-20 max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">All Collections</h2>
                    <span className="text-sm text-gray-400">
                        Page 1 of {Math.ceil(filteredCollections.length / 20)} • {filteredCollections.length} total collections
                    </span>
                </div>

                <div className={`grid gap-6 ${viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                    }`}>
                    {filteredCollections.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/collection/${collection.id}`}
                            className="group bg-zinc-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                        >
                            <div className={`relative ${viewMode === 'grid' ? 'aspect-video' : 'aspect-[3/1] sm:aspect-[4/1]'}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w780${collection.backdrop_path || collection.poster_path}`}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                                        {collection.name}
                                    </h3>
                                    {viewMode === 'list' && (
                                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">{collection.overview}</p>
                                    )}
                                </div>

                                {/* Count Badge */} 
                                <div className="absolute bottom-4 right-4 bg-zinc-800/90 backdrop-blur px-2 py-0.5 rounded text-xs font-medium text-white border border-zinc-700">
                                    {collection.parts?.length || '?'}
                                </div>
                            </div>

                            {viewMode === 'grid' && (
                                <div className="p-4">
                                    <p className="text-xs text-gray-400 line-clamp-2">
                                        {collection.overview || `The ${collection.name} includes multiple movies.`}
                                    </p>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
