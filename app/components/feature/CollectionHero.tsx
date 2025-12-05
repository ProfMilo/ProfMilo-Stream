'use client';

import Link from 'next/link';
import { ArrowLeft, Film, Layers } from 'lucide-react';

interface CollectionHeroProps {
    collection: {
        name: string;
        overview: string;
        poster_path: string;
        backdrop_path: string;
        parts: any[];
    };
}

export default function CollectionHero({ collection }: CollectionHeroProps) {
    return (
        <div className="relative w-full h-[60vh] min-h-[500px]">
            {/* Backdrop Image */}
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            </div>

            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full max-w-7xl mx-auto">

                    {/* Floating Poster */}
                    <div className="hidden md:block shrink-0 w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative z-10 -mb-20">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                            alt={collection.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6 pb-8 md:pb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            {collection.name}
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-md border border-white/10 text-sm font-medium text-white">
                                <Film className="w-4 h-4" />
                                <span>{collection.parts.length} Movies</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-md border border-white/10 text-sm font-medium text-white">
                                <Layers className="w-4 h-4" />
                                <span>Collection</span>
                            </div>
                        </div>

                        <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                            {collection.overview}
                        </p>

                        <div className="pt-4">
                            <Link
                                href="/collection"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg text-sm font-medium text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
